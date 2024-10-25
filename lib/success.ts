export interface SuccessResponseType<T = unknown> {
	status: true;
	statusCode: number;
	message: string;
	data?: T;
}

export class SuccessResponse<T = unknown> {
	status: true;
	statusCode: number;
	data?: T;
	message: string;

	constructor(message: string, statusCode: number, data?: T) {
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;
		this.status = true;
	}

	serialize(): {
		status: true;
		message: string;
		statusCode: number;
		data: T;
	} {
		return {
			status: this.status,
			message: this.message,
			statusCode: this.statusCode,
			data: this.data as T,
		};
	}
}
