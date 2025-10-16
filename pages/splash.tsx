import { Image, useWindowDimensions, View } from "react-native"
import { styles } from "../common/global-styles"
import { useTheme } from "../common/theme"
import { useEffect, useState } from "react"
import authStorage from "../storage/auth-storage"
import profileStorage from "../storage/profile-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackNavigatorList } from "../model/navigator"
import apiClient, { apiClientWithHandler } from "../common/api"
import * as Keychain from "react-native-keychain";
import IProfile from "../model/profile"


type Props = NativeStackScreenProps<RootStackNavigatorList, 'Splash'>
export const SplashScreen = ({ navigation }: Props) => {
    const theme = useTheme()
    const { setAccessToken } = authStorage()
    const { setProfile } = profileStorage()
    const dimension = useWindowDimensions()

    useEffect(() => {
        // Get refresh token
        (async () => {
            try {
                const refreshToken = await Keychain.getGenericPassword()
                if (!refreshToken) {
                    navigation.replace("SignIn")
                    return
                }

                const profile = await apiClientWithHandler<IProfile>({ url: "/profile/get", method: "GET" })
                if (profile.data) {
                    setProfile(profile.data)
                    navigation.replace("Home")
                    return
                }

            } catch (error) {
                console.error(error)
            }
        })()
    }, [])
    return (
        <View style={[styles.screen, { backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }]}>
            <Image source={require("../assets/images/robot.png")} />
        </View>
    )
}


