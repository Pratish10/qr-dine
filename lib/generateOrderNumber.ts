import prisma from '@/db';

export async function generateOrderNumber(): Promise<string> {
	try {
		const today = new Date();
		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');
		const dateFormatted = `${year}${month}${day}`;

		const existingOrder = await prisma.orderCount.findUnique({
			where: { date: dateFormatted },
		});

		let orderCount = 1;

		if (existingOrder !== null) {
			orderCount = existingOrder.count + 1;
			await prisma.orderCount.update({
				where: { date: dateFormatted },
				data: { count: orderCount },
			});
		} else {
			await prisma.orderCount.create({
				data: {
					date: dateFormatted,
					count: orderCount,
				},
			});
		}

		const formattedOrderCount = orderCount.toString().padStart(4, '0');
		const orderNumber = `O-${dateFormatted}-${formattedOrderCount}`;

		return orderNumber;
	} catch (error) {
		throw new Error('Unable to generate order number');
	}
}
