import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { ApiResult, ISuccessResponse } from "../model/response";
import normalizeError from "./error-handler";
import * as Keychain from "react-native-keychain";
import authStorage from "../storage/auth-storage";

interface Request {
    url: string,
    method: 'GET' | 'POST' | 'UPDATE' | 'DELETE',
    body?: {},
    header?: RawAxiosRequestHeaders,
}

const API_BASE_URL = "http://127.0.2.2:3000"

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})
let isRefreshing = false

let failedQueue: Array<{ resolve: (value: any) => void, reject: (reason?: any) => void }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


apiClient.interceptors.request.use((config) => {
    const { getAccessToken } = authStorage.getState()
    if (getAccessToken()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

apiClient.interceptors.response.use((response) => response, async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error)
    }

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
        }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
        const getRefreshToken = await Keychain.getGenericPassword()
        if (!getRefreshToken) {
            isRefreshing = false
            processQueue(error, null)
            return Promise.reject(error)
        }

        const refreshResponse = await axios.post<{ access_token: string, refresh_token: string }>(
            `${API_BASE_URL}/auth/refresh`,
            { refresh_token: getRefreshToken.password, client: "mobile-react" }
        )

        const { access_token, refresh_token } = refreshResponse.data

        await Keychain.setGenericPassword("refresh_token", refresh_token)
        authStorage.getState().setAccessToken(access_token)

        apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        processQueue(null, access_token)
        return apiClient(originalRequest)
    } catch (refreshError) {
        authStorage.getState().clearAccessToken();
        await Keychain.resetGenericPassword();

        processQueue(refreshError as AxiosError, null);
        authStorage.getState().logOut()
        return Promise.reject(refreshError);
    } finally {
        isRefreshing = false
    }
})


interface IRequest {
    url: string,
    body?: object,
    header?: RawAxiosRequestHeaders,
    method: "GET" | "POST" | "UPDATE" | "DELETE"
}

export const apiRequest = async <T>(req: IRequest): Promise<ApiResult<T>> => {
    try {
        const result = await axios<ISuccessResponse<T>>({ baseURL: API_BASE_URL, url: req.url, data: req.body, headers: req.header, method: req.method })

        return {
            data: result.data.data,
            error: null
        }
    } catch (error) {
        return {
            error: normalizeError(error),
            data: null
        }
    }
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