import { Alert, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { styles } from "../common/global-styles"
import { useTheme } from "../common/theme"
import AppTextInput from "../component/text-input/text-input"
import request, { apiClientWithHandler, apiRequest } from "../common/api"
import { useState } from "react"
import { ErrorDetails } from "../model/response"
import * as Keychain from "react-native-keychain";
import authStorage from "../storage/auth-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackNavigatorList } from "../model/navigator"
import apiClient from "../common/api"
import { AxiosError } from "axios"

type Props = NativeStackScreenProps<RootStackNavigatorList, 'SignIn'>

export const SignInScreen = ({ navigation }: Props) => {
    const theme = useTheme()
    const dimension = useWindowDimensions()
    const { setAccessToken } = authStorage()
    const height = dimension.height
    const width = dimension.width

    const [showPassword, setShowPassword] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({});

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert("Email or password won't be empty")
            return
        }

        const res = await apiClientWithHandler({ url: "/auth/sign-in", method: "POST", body: { client: "mobile-react", email, password } })
        if (res.error) {
            if (res.error.details && Object.keys(res.error.details).length > 0) {
                setErrors(res.error.details as ErrorDetails)
            } else {
                Alert.alert(res.error.message)
            }
        } else {
            const tokens = res.data as { access_token: string, refresh_token: string }
            setAccessToken(tokens.access_token)
            await Keychain.setGenericPassword("refresh_token", tokens.refresh_token, { accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY })
            // If user sign in with successfully route home page
            navigation.replace("Home")
        }
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }]}>
            <View style={{ alignItems: "center", padding: 16 }}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../assets/images/robot.png")} height={height * .25} width={width * .25} />
                </View>
            </View>

            <View style={{ width: "100%", gap: 8 }}>
                <View>
                    <AppTextInput textInput={{
                        onValueChange: (e => setEmail(e)),
                        value: email,
                        placeholder: "Email",
                        style: { height: height * .06 },
                        keyboardType: "email-address",
                        textContentType: "emailAddress",

                    }} />
                    {errors.email && (
                        <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.email}</Text>
                    )}
                </View>

                <View>
                    <AppTextInput textInput={{
                        onValueChange: (e => setPassword(e)),
                        value: password,
                        placeholder: "Password",
                        style: { height: height * .06 },
                        keyboardType: "visible-password",
                        textContentType: "password",
                        secureTextEntry: showPassword,
                        rightIconName: showPassword ? "eye" : "eye-slash",
                        onRightIconPress() {
                            setShowPassword(!showPassword)
                        },
                    }} />
                    {errors.password && (
                        <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.password}</Text>
                    )}
                </View>

                <View style={{ width: "100%", alignItems: "center" }}>
                    <TouchableOpacity onPress={signIn} style={{ backgroundColor: theme.primary[500], padding: 16, borderRadius: 4, width: "100%" }}>
                        <Text style={[styles.LABEL_LARGE, { color: theme.textColor2, textAlign: "center" }]}>Sign in</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingTop: 8 }} >
                        <Text style={[styles.LABEL_MEDIUM, { color: theme.textColor }]}>
                            You don’t have a any account?
                        </Text>

                        <TouchableOpacity onPress={() => { navigation.navigate("SignIn") }}>
                            <Text style={[styles.LABEL_MEDIUM, { color: theme.secondary[500] }]}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View >
    )
}