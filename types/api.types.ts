import { type ErrorResponseType } from '@/lib/error';
import { type SuccessResponseType } from '@/lib/success';

export type ServerActionReturnType<T = unknown> = SuccessResponseType<T> | ErrorResponseType;
