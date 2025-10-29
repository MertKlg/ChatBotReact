import * as Keychain from "react-native-keychain";
import authStorage from "../storage/auth-storage";
import axios from "axios";
import { API_BASE_URL } from "../common/api";

let isRefreshing = true
let refreshPromise: Promise<boolean> | null = null

export const refreshToken = async () => {
    if (isRefreshing) {
        return refreshPromise
    }

    isRefreshing = true
    refreshPromise = (async () => {
        try {
            // Process refresh steps
            const getRefreshToken = await Keychain.getGenericPassword()
            if (!getRefreshToken) {
                authStorage.getState().logOut()
                return false
            }

            const genNewToken = await axios.post<{ access_token: string, refresh_token: string }>(API_BASE_URL + "/auth/refresh", { refresh_token: getRefreshToken.password, client: "mobile-react" })
            const { access_token, refresh_token } = genNewToken.data

            await Keychain.setGenericPassword("refresh_token", refresh_token)
            authStorage.getState().setAccessToken(access_token)
            return true
        } catch (error) {
            console.log("Something went wrong")
            authStorage.getState().logOut()
            return false
        } finally {
            isRefreshing = false
            refreshPromise = null
        }
    })()

    return refreshPromise
}