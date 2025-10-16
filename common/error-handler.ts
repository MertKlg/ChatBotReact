import { AxiosError } from "axios"
import { IErrorResponse } from "../model/response"
import { createJSONStorage } from "zustand/middleware"

const normalizeError = (error: unknown): IErrorResponse => {
    if (error instanceof AxiosError) {
        if (error.response) {
            const response = error.response.data as { message: string, details: any }
            return {
                status: error.status ?? 500,
                success: false,
                message: response.message,
                details: response.details
            }
        }

        return {
            success: false,
            status: error.status ? error.status : 500,
            message: error.message || 'A network error occurred. Please check your connection.',
        };
    }

    return {
        status: 500,
        message: "Interval server error",
        success: false
    }
}

export default normalizeError