export interface ISuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface IErrorResponse {
    success: false;
    message: string;
    status: number;
    details?: any;
}

export type ApiResult<T> = {
    data: T | null;
    error: IErrorResponse | null;
};


export type ErrorDetails = Record<string, string>
