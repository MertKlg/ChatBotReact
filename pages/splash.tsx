import { Dimensions, Image, Text, useWindowDimensions, View } from "react-native"
import { styles } from "../common/global-styles"
import { useTheme } from "../common/theme"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Screens from "../common/screens"
import * as Keychain from "react-native-keychain";
import request from "../common/api"
import authStorage from "../storage/auth-storage"
import profileStorage from "../storage/profile-storage"
import IProfile from "../model/profile"

export const SplashScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const { setAccessToken } = authStorage()
    const { setProfile } = profileStorage()
    const dimension = useWindowDimensions()
    const height = dimension.height
    const width = dimension.width

    useEffect(() => {
        // Get refresh token
        (async () => {
            try {
                const refreshToken = await Keychain.getGenericPassword()
                if (!refreshToken) {
                    navigation.replace(Screens.SIGN_IN)
                    return
                }
                // If refresh token available get new access token
                const getAccessToken = await request<{ access_token: string, refresh_token: string }>({ url: "/auth/refresh", method: "POST", body: { client: "mobile-react", refresh_token: refreshToken.password } })
                if (getAccessToken.error || !getAccessToken.data) {
                    await Keychain.resetGenericPassword()
                    navigation.replace(Screens.SIGN_IN)
                    return
                }

                // If token successfully got, save in zustand
                const token = getAccessToken.data.access_token
                setAccessToken(token)

                // Get user profile
                const profile = await request<IProfile>({ url: "/profile/get", method: "GET", header: { Authorization: `Bearer ${token}` } })

                if (profile.error || !profile.data) {
                    navigation.replace(Screens.SIGN_IN)
                    return
                }
                setProfile(profile.data)
                navigation.replace(Screens.HOME)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <View style={[styles.screen, { backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }]}>
            <Image source={require("../assets/images/robot.png")} />
        </View>
    )
}


