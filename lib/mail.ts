import nodemailer from 'nodemailer'
import {
    EmailTemplate,
    PasswordResetEmail,
    SendTwoFactorMailTemplate,
} from '@/components/auth/email-template'
import {
    EMAIL_VERIFICATION,
    PASSWORD_RESET,
    TWO_FA_CODE,
} from '@/config/auth.config'
import { ErrorHandler } from './error'
import { getDomain } from './utils'

const domain = getDomain()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})

const sendEmail = async (
    email: string,
    subject: string,
    template: string
): Promise<void> => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject,
            html: template,
        }

        await transporter.sendMail(mailOptions)
    } catch {
        throw new ErrorHandler(`Could not send email`, 'BAD_REQUEST')
    }
}

export const sendVerificationEmail = async (
    email: string,
    token: string
): Promise<void> => {
    try {
        const verificationLink = `${domain}/auth/new-verification?token=${token}`

        const emailContent = EmailTemplate({ confirmLink: verificationLink })

        await sendEmail(email, EMAIL_VERIFICATION, emailContent)
    } catch {
        throw new ErrorHandler(`Could not send email`, 'BAD_REQUEST')
    }
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
): Promise<void> => {
    try {
        const verificationLink = `${domain}/auth/new-password?token=${token}`

        const emailContent = PasswordResetEmail({
            confirmLink: verificationLink,
        })

        await sendEmail(email, PASSWORD_RESET, emailContent)
    } catch {
        throw new ErrorHandler(`Could not send email`, 'BAD_REQUEST')
    }
}

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
): Promise<void> => {
    try {
        const emailContent = SendTwoFactorMailTemplate({ token })

        await sendEmail(email, TWO_FA_CODE, emailContent)
    } catch {
        throw new ErrorHandler(`Could not send email`, 'BAD_REQUEST')
    }
}
