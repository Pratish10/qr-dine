interface EmailTemplateProps {
	confirmLink: string;
}

export const EmailTemplate = ({ confirmLink }: EmailTemplateProps): string =>
	`<div style="font-family: Arial, sans-serif; color: #333;">
    <h3>Welcome to Food-Ordering-System!</h3>
    <p>
      We're excited to have you on board. To get started, please confirm your email by clicking the link below:
    </p>
    <p>
      <a href="${confirmLink}" style="color: #1a73e8; text-decoration: none;">Confirm Your Email</a>
    </p>
    <p>
      <strong>Note:</strong> This confirmation link is valid for 1 hour. If you did not create an account, please disregard this email.
    </p>
    <p>Thank you for joining us!</p>
    <p>Best regards,<br />The Food-Ordering-System Team</p>
  </div>`;

export const PasswordResetEmail = ({ confirmLink }: EmailTemplateProps): string =>
	`<div style="font-family: Arial, sans-serif; color: #333;">
      <h3>Password Reset Request</h3>
      <p>
        We received a request to reset your password for your account at Food-Ordering-System. You can reset your password by clicking the link below:
      </p>
      <p>
        <a href="${confirmLink}" style="color: #1a73e8; text-decoration: none;">Reset Your Password</a>
      </p>
      <p>
        <strong>Note:</strong> This password reset link is valid for 1 hour. If you did not request this, please ignore this email.
      </p>
      <p>If you have any issues, feel free to contact our support team.</p>
      <p>Best regards,<br />The Food-Ordering-System Team</p>
    </div>`;

export const SendTwoFactorMailTemplate = ({ token }: { token: string }): string =>
	`<div style="font-family: Arial, sans-serif; color: #333;">
        <h3>Your Two-Factor Authentication Code</h3>
        <p>
          As part of our commitment to keeping your account secure, please use the following code to complete your login process:
        </p>
        <p style="font-size: 18px; font-weight: bold;">
          ${token}
        </p>
        <p>
          <strong>Note:</strong> This code will expire in 5 minutes. If you did not request this code, please secure your account immediately.
        </p>
        <p>Stay safe,<br />The Food-Ordering-System Team</p>
      </div>`;
