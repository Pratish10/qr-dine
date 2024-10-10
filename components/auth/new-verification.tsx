'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/user/new-verification'
import { AuthCard } from './auth-card'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import APP_PATHS from '@/config/path.config'

export const NewVerificationForm = (): JSX.Element => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const searchParams = useSearchParams()

    const token = searchParams.get('token') ?? ''
    const onSubmit = useCallback(() => {
        if ((success ?? error) != null) return
        if (token === '') {
            setError('Token Missing!')
        }

        newVerification(token)
            .then((res) => {
                if (res.status) {
                    setSuccess(res.message)
                } else {
                    setError(res.message)
                }
            })
            .catch(() => {
                setError('Something Went Wrong!')
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <AuthCard
            headerLabel="Confirming your verification"
            backButtonTo={APP_PATHS.LOGIN}
            backButtonLabel="Back to Login Page"
            cardTitle="logo here"
            HomeLabel="Back To Home"
            toHome={APP_PATHS.HOME}
        >
            <div className="flex items-center justify-center w-full">
                {success == null && error == null && <div>Loading...</div>}
                <FormSuccess message={success} />
                {success == null && <FormError message={error} />}
            </div>
        </AuthCard>
    )
}
