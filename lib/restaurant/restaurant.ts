import prisma from '@/db'
import { type Prisma } from '@prisma/client'
import { type DefaultArgs } from '@prisma/client/runtime/library'

export const getRestaurantByBranchName = (
    branchName: string
): Prisma.Prisma__RestaurantClient<
    {
        id: string
        restaurantId: string
        fullName: string
        branchName: string
        address: string
        pinCode: string
        city: string
        state: string
        country: string
        userId: string
    } | null,
    null,
    DefaultArgs
> | null => {
    try {
        const restaurant = prisma.restaurant.findUnique({
            where: { branchName },
        })
        return restaurant
    } catch {
        return null
    }
}

export const getRestaurantByRestaurantId = (
    restaurantId: string
): Prisma.Prisma__RestaurantClient<
    {
        id: string
        restaurantId: string
        fullName: string
        branchName: string
        address: string
        pinCode: string
        city: string
        state: string
        country: string
        userId: string
    } | null,
    null,
    DefaultArgs
> | null => {
    try {
        const restaurant = prisma.restaurant.findUnique({
            where: { restaurantId },
        })
        return restaurant
    } catch {
        return null
    }
}

export const getRestaurantsByUserId = async (
    userId: string
): Promise<Array<{
    id: string
    restaurantId: string
    fullName: string
    branchName: string
    address: string
    pinCode: string
    city: string
    state: string
    country: string
    userId: string
}> | null> => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                userId,
            },
        })

        if (restaurants.length > 0) {
            return restaurants
        } else {
            return null
        }
    } catch {
        return null
    }
}
