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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createRestaurant } from '@/actions/restaurant/create-restaurant'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import APP_PATHS from '@/config/path.config'

interface User {
    id: string
    name: string
    email: string
    image: string | null
    isTwoFactorEnabled: boolean
}

interface UserButtonType {
    user?: User
}

// Reusable form field component for cleaner code
const FormInputField = ({
    name,
    label,
    placeholder,
    type = 'text',
    control,
    disabled,
}: {
    name: keyof RestaurantSchemaType
    label: string
    placeholder: string
    type?: string
    control: any
    disabled: boolean
}): React.JSX.Element => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        {...field}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)

export const RestaurantForm = ({ user }: UserButtonType): React.JSX.Element => {
    const router = useRouter()
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
            void createRestaurant(values).then((res) => {
                if (res.status) {
                    toast.success(res.message)
                    router.push(APP_PATHS.DASHBOARD)
                } else {
                    setError(res.message)
                }
            })
        })
    }

    return (
        <Form {...form}>
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(submitHandler)}
                className="space-y-4"
            >
                {/* Feedback messages */}
                <FormError message={error} />
                <FormSuccess message={success} />

                {/* Form fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Restaurant Name and Branch Name */}
                    <FormInputField
                        name="fullName"
                        label="Restaurant Name"
                        placeholder="Restaurant Name"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInputField
                        name="branchName"
                        label="Branch Name"
                        placeholder="Branch Name"
                        control={form.control}
                        disabled={isPending}
                    />
                </div>

                {/* Restaurant Address (text area) */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Restaurant Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Address"
                                    className="w-full p-2 border rounded-md disabled:opacity-50"
                                    rows={4}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Pin Code and City */}
                    <FormInputField
                        name="pinCode"
                        label="Pin Code"
                        placeholder="Pin Code"
                        type="number"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInputField
                        name="city"
                        label="City"
                        placeholder="City"
                        control={form.control}
                        disabled={isPending}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* State and Country */}
                    <FormInputField
                        name="state"
                        label="State"
                        placeholder="State"
                        control={form.control}
                        disabled={isPending}
                    />
                    <FormInputField
                        name="country"
                        label="Country"
                        placeholder="Country"
                        control={form.control}
                        disabled={isPending}
                    />
                </div>

                {/* Submit button */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Button
                        variant="destructive"
                        onClick={() => {
                            form.reset()
                        }}
                        className="w-full"
                        disabled={isPending}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </Form>
    )
}
