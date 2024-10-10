'use client'
import { RestaurantSchema } from '@/schemas/schema'
import { type RestaurantSchemaType } from '@/schemas/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface User {
    id: string
    name: string
    email: string
    image: string | null
    isTwoFactorEnabled: boolean
}

interface UserButtonType {
    user: User | undefined
}

export const RestaurantForm = ({ user }: UserButtonType): React.JSX.Element => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<RestaurantSchemaType>({
        resolver: zodResolver(RestaurantSchema),
        defaultValues: {
            fullName: '',
            branchName: '',
            address: '',
            pinCode: '',
            city: '',
            country: '',
            state: '',
            userId: user?.id,
        },
    })

    const submitHandler = (values: RestaurantSchemaType): void => {
        setError('')
        setSuccess('')

        startTransition(() => {
            console.log(values)
        })
    }
    return (
        <Form {...form}>
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(submitHandler)}
            >
                <div className="space-y-4">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <React.Fragment>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Restaurant Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Restaurant Name"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="branchName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Branch Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Branch Name"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reataurant Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Address"
                                            type=""
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pinCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pin Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Pin Code"
                                            type="number"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="City"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="State"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Country"
                                            type="text"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </React.Fragment>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    Register
                </Button>
            </form>
        </Form>
    )
}
