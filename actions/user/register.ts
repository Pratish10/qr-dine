"use server";
import { RegisterUserSchema } from "@/schemas/schema";
import { RegisterUserType } from "@/schemas/types";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { withServerActionAsyncCatcher } from "@/lib/async-catch";
import { ServerActionReturnType } from "@/types/api.types";
import { getUserByEmail } from "@/lib/user";
import prisma from "@/db";
import { ErrorHandler } from "@/lib/error";
import { SuccessResponse } from "@/lib/success";

export const register = withServerActionAsyncCatcher<
  RegisterUserType,
  ServerActionReturnType
>(async (values) => {
  const validatedFields = RegisterUserSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new ErrorHandler("Invalid Fields!", "BAD_REQUEST");
  }
  const { name, email, password } = validatedFields.data;
  const encryptedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser !== null) {
    throw new ErrorHandler("User Already Exists!", "BAD_REQUEST");
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        encryptedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return new SuccessResponse(
      "A verification mail has been sent to your email id!",
      201
    ).serialize();
  } catch {
    throw new ErrorHandler("Internal Server Error", "INTERNAL_SERVER_ERROR");
  }
});
