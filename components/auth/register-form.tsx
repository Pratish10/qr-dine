"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterUserSchema } from "@/schemas/schema";
import { RegisterUserType } from "@/schemas/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { register } from "@/actions/user/register";
import { AuthCard } from "./auth-card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import APP_PATHS from "@/config/path.config";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: RegisterUserType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      void register(values).then((res) => {
        if (res.status) {
          setSuccess(res.message);
        } else {
          setError(res.message);
        }
      });
    });
  };

  return (
    <AuthCard
      isSocialbutton
      headerLabel="Register"
      cardTitle="Food Ordering System"
      backButtonLabel="Already have an account?"
      backButtonTo={APP_PATHS.LOGIN}
      HomeLabel="Back To Home"
      toHome={APP_PATHS.HOME}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormError message={error} />
            <FormSuccess message={success} />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};
