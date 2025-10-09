import axios, { RawAxiosRequestHeaders } from "axios";
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

const request = async <T>(req: Request): Promise<ApiResult<T>> => {
    try {
        const result = await axios<ISuccessResponse<T>>({
            baseURL: "http://127.0.0.1:3000",
            url: req.url,
            method: req.method,
            data: req.body,
            headers: req.header
        })

        return {
            data: result.data.data,
            error: null
        }
    } catch (err) {
        return {
            error: normalizeError(err),
            data: null
        }
    }
}

export const refresh = async (): Promise<ApiResult<boolean>> => {
    try {
        const { setAccessToken, clearAccessToken } = authStorage()
        const getRefreshToken = await Keychain.getGenericPassword()
        if (!getRefreshToken) {
            throw new Error("RefreshToken not found")
        }
        const res = await request<{ access_token: string, refresh_token: string }>({
            url: "/auth/refresh",
            body: {
                client: "mobile-react",
                refresh_token: getRefreshToken
            },
            method: "POST"
        })

        if (!res.data) {
            throw new Error("Something went wrong")
        }
        await Keychain.resetGenericPassword()
        await Keychain.setGenericPassword("refresh_token", res.data.refresh_token)
        clearAccessToken()
        setAccessToken(res.data.access_token)
        return {
            data: true,
            error: null
        }
    } catch (error) {
        return {
            error: normalizeError(error),
            data: false
        }
    }
}

export default request