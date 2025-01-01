/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler, standardizeApiError } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { type ServerActionReturnType } from '@/types/api.types';
import { type EarningsData } from '@/types/data.types';
import { type NextRequest, NextResponse } from 'next/server';

async function getDailyEarnings(restaurantId: string, date: Date): Promise<Array<{ day: string; amount: number }>> {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const dailyOrders = await prisma.order.findMany({
		where: {
			restaurantId,
			orderDate: {
				gte: startOfDay,
				lte: endOfDay,
			},
			isPaid: true,
		},
		include: {
			orderItems: true,
		},
	});

	const hourlyEarnings = Array(24).fill(0);
	dailyOrders.forEach((order) => {
		const hour = order.orderDate.getHours();
		const amount = order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
		hourlyEarnings[hour] += amount;
	});

	return hourlyEarnings.map((amount, index) => ({
		day: `${index}:00`,
		amount: Number((amount / 100).toFixed(2)),
	}));
}

async function getWeeklyEarnings(restaurantId: string, date: Date): Promise<Array<{ day: string; amount: number }>> {
	const startOfWeek = new Date(date);
	startOfWeek.setDate(date.getDate() - date.getDay());
	startOfWeek.setHours(0, 0, 0, 0);
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	const weeklyOrders = await prisma.order.findMany({
		where: {
			restaurantId,
			orderDate: {
				gte: startOfWeek,
				lte: endOfWeek,
			},
			isPaid: true,
		},
		include: {
			orderItems: true,
		},
	});

	const dailyEarnings = Array(7).fill(0);
	weeklyOrders.forEach((order) => {
		const dayIndex = order.orderDate.getDay();
		const amount = order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
		dailyEarnings[dayIndex] += amount;
	});

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return dailyEarnings.map((amount, index) => ({
		day: daysOfWeek[index],
		amount: Number((amount / 100).toFixed(2)),
	}));
}

async function getMonthlyEarnings(restaurantId: string, date: Date): Promise<Array<{ month: string; amount: number }>> {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const endOfYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);

	const yearlyOrders = await prisma.order.findMany({
		where: {
			restaurantId,
			orderDate: {
				gte: startOfYear,
				lte: endOfYear,
			},
			isPaid: true,
		},
		include: {
			orderItems: true,
		},
	});

	const monthlyEarnings = Array(12).fill(0);
	yearlyOrders.forEach((order) => {
		const monthIndex = order.orderDate.getMonth();
		const amount = order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
		monthlyEarnings[monthIndex] += amount;
	});

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return monthlyEarnings.map((amount, index) => ({
		month: months[index],
		amount: Number((amount / 100).toFixed(2)),
	}));
}

export async function GET(req: NextRequest): Promise<NextResponse<ServerActionReturnType>> {
	try {
		const user = await getCurrentUser();

		if (!user?.id) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const existingUser = await getUserById(user.id);

		if (!existingUser) {
			throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
		}

		const { searchParams } = new URL(req.url);
		const restaurantId = searchParams.get('id');
		const dateParam = searchParams.get('date');

		if (!restaurantId) {
			throw new ErrorHandler('Restaurant ID is required', 'BAD_REQUEST');
		}

		const date = dateParam ? new Date(dateParam) : new Date();

		const dailyEarnings = await getDailyEarnings(restaurantId, date);
		const weeklyEarnings = await getWeeklyEarnings(restaurantId, date);
		const monthlyEarnings = await getMonthlyEarnings(restaurantId, date);

		const earningsData: EarningsData = {
			daily: dailyEarnings,
			weekly: weeklyEarnings,
			monthly: monthlyEarnings,
		};

		return NextResponse.json(new SuccessResponse<EarningsData>('Fetched Earnings Data Successfully', 200, earningsData).serialize());
	} catch (error) {
		const standardizedError = standardizeApiError(error);
		return NextResponse.json(standardizedError, { status: standardizedError.code });
	}
}
