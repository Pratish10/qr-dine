'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'

import { ResetSchema } from '@/schemas/schema'
import { type ResetSchemaType } from '@/schemas/types'
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
import { resetPassword } from '@/actions/user/reset-password'
import { AuthCard } from './auth-card'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import APP_PATHS from '@/config/path.config'

export const ResetForm = (): JSX.Element => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<ResetSchemaType>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        },
    })

    const submitHandler = (values: ResetSchemaType): void => {
        setError('')
        setSuccess('')

        startTransition(() => {
            void resetPassword(values).then((res) => {
                if (res.status) {
                    setSuccess(res.message)
                } else {
                    setError(res.message)
                }
            })
        })
    }

    return (
        <AuthCard
            headerLabel=""
            cardTitle="Reset Password"
            backButtonLabel="Back to Login Page"
            backButtonTo={APP_PATHS.LOGIN}
            HomeLabel="Back To Home"
            toHome={APP_PATHS.HOME}
        >
            <Form {...form}>
                <form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={form.handleSubmit(submitHandler)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="example@example.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Send reset email
                    </Button>
                </form>
            </Form>
        </AuthCard>
    )
}
