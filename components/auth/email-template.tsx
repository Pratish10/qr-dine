interface EmailTemplateProps {
	confirmLink: string;
}

export const EmailTemplate = ({ confirmLink }: EmailTemplateProps): string =>
	`<div style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #1a73e8; text-align: center;">Welcome to QR Dine!</h2>
    <p style="font-size: 16px;">
      Hello,
    </p>
    <p style="font-size: 16px;">
      Thank you for joining <strong>QR Dine</strong>. We're thrilled to have you with us! To activate your account and begin exploring all the delicious options we offer, please confirm your email address by clicking the button below:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${confirmLink}" style="display: inline-block; padding: 12px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
        Confirm Your Email
      </a>
    </div>
    <p style="font-size: 16px;">
      <strong>Note:</strong> This link is valid for only <strong>1 hour</strong>. If you did not create an account with us, you can safely ignore this email.
    </p>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
    <p style="font-size: 14px; color: #555;">
      If the button above doesn’t work, copy and paste the following link into your browser:
      <br />
      <a href="${confirmLink}" style="color: #1a73e8; text-decoration: underline;">${confirmLink}</a>
    </p>
    <p style="font-size: 16px; margin-top: 20px;">
      Thank you,<br />
      <strong>The QR Dine Team</strong>
    </p>
  </div>`;

export const PasswordResetEmail = ({ confirmLink }: { confirmLink: string }): string =>
	`<div style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #d93025; text-align: center;">Password Reset Request</h2>
      <p style="font-size: 16px;">
        Hello,
      </p>
      <p style="font-size: 16px;">
        We received a request to reset your password for your account at <strong>QR Dine</strong>. You can reset your password by clicking the button below:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${confirmLink}" style="display: inline-block; padding: 12px 20px; background-color: #d93025; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          Reset Your Password
        </a>
      </div>
      <p style="font-size: 16px;">
        <strong>Note:</strong> This link is valid for only <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <p style="font-size: 14px; color: #555;">
        If the button above doesn’t work, copy and paste the following link into your browser:
        <br />
        <a href="${confirmLink}" style="color: #d93025; text-decoration: underline;">${confirmLink}</a>
      </p>
      <p style="font-size: 16px; margin-top: 20px;">
        Thank you,<br />
        <strong>The QR Dine Team</strong>
      </p>
    </div>`;

export const SendTwoFactorMailTemplate = ({ token }: { token: string }): string =>
	`<div style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a73e8; text-align: center;">Your Two-Factor Authentication Code</h2>
      <p style="font-size: 16px;">
        Hello,
      </p>
      <p style="font-size: 16px;">
        As part of our commitment to keeping your account secure, please use the following code to complete your login process:
      </p>
      <p style="text-align: center; font-size: 24px; font-weight: bold; color: #1a73e8;">
        ${token}
      </p>
      <p style="font-size: 16px;">
        <strong>Note:</strong> This code will expire in <strong>5 minutes</strong>. If you did not request this code, please secure your account immediately.
      </p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <p style="font-size: 16px;">
        Stay safe,<br />
        <strong>The QR Dine Team</strong>
      </p>
    </div>`;
