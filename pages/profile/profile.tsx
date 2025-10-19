import { Text, useWindowDimensions, View } from "react-native"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import { apiClientWithHandler } from "../../common/api"
import { useCallback, useState } from "react"
import IProfile from "../../model/profile"
import { useFocusEffect } from "@react-navigation/native"
import AppTextInput from "../../component/text-input/text-input"
import FontAwesome6 from "@react-native-vector-icons/fontawesome6"
import { AppButton } from "../../component/button/default"


export const ProfileScreen = () => {
    const theme = useTheme()
    const [profile, setProfile] = useState<IProfile | undefined>()
    const dimension = useWindowDimensions()
    const height = dimension.height

    useFocusEffect(
        useCallback(() => {
            (async () => getProfile())()
            return () => {
                setProfile(undefined)
            }
        }, []))

    const getProfile = async () => {
        const result = await apiClientWithHandler<IProfile>({ url: '/profile/get', method: 'GET' })
        if (result.data) {
            setProfile(result.data)
        }
    }
    return (
        <View style={[styles.screen, { backgroundColor: theme.background, alignItems: "center", gap: 24 }]}>
            <Text style={[styles.HEADLINE_LARGE, { color: theme.textColor }]}>Welcome</Text>

            <View style={{ width: "100%", gap: 12 }}>
                <AppTextInput textInput={{
                    onValueChange: (e => { }),
                    value: profile?.email ?? "",
                    placeholder: "Email",
                    style: { height: height * .06 },
                    keyboardType: "email-address",
                    textContentType: "emailAddress",
                    editable: false
                }} />
                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                    <FontAwesome6 name="clock" color={theme.textColor} iconStyle="solid" />
                    <Text style={{ color: theme.textColor }} >{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : undefined}</Text>
                </View>
                <View>
                    <AppButton text="Update" onPress={() => { }} textStyle={{ styles: { textAlign: "center" } }} />
                </View>
            </View>
        </View>
    )
}