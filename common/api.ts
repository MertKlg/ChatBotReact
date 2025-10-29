import axios, { RawAxiosRequestHeaders } from "axios";
import { ApiResult, ISuccessResponse } from "../model/response";
import normalizeError from "./error-handler";
import authStorage from "../storage/auth-storage";
import { refreshToken } from "../service/auth-service";

export const API_BASE_URL = "http://127.0.0.1:3000"

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use((config) => {
    const { getAccessToken } = authStorage.getState()
    if (getAccessToken()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

apiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    if (originalRequest.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const success = await refreshToken()
        if (success) {
            originalRequest.headers.Authorization = `Bearer ${authStorage.getState().accessToken}`
            return apiClient(originalRequest)
        }
    }

    return Promise.reject(error)

})


interface IRequest {
    url: string,
    body?: object,
    header?: RawAxiosRequestHeaders,
    method: "GET" | "POST" | "UPDATE" | "DELETE"
}

export const apiClientWithHandler = async <T>(req: IRequest): Promise<ApiResult<T>> => {
    try {
        const res = await apiClient<ISuccessResponse<T>>({ url: req.url, method: req.method, headers: req.header, data: req.body })
        return {
            data: res.data.data,
            error: null
        }
    } catch (error) {
        return {
            error: normalizeError(error),
            data: null
        }
    }
}


export default apiClient