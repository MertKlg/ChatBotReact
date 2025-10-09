import { Alert, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { styles } from "../common/global-styles"
import { useTheme } from "../common/theme"
import AppTextInput from "../component/text-input/text-input"
import { useState } from "react"
import request from "../common/api"
import { ErrorDetails } from "../model/response"
import { useNavigation } from "@react-navigation/native"
import { Screen } from "react-native-screens"
import Screens from "../common/screens"

export const SignUpScreen = () => {
    const theme = useTheme()
    const dimension = useWindowDimensions()
    const width = dimension.width
    const height = dimension.height
    const navigation = useNavigation()

    // Form inputs
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordAgain, setShowPasswordAgain] = useState(true)

    // Send form
    const signUp = async () => {
        const res = await request({
            url: "/auth/sign-up", body: {
                username,
                email,
                password,
                passwordAgain
            }, method: "POST"
        })

        if (res.error) {
            if (res.error.details && Object.keys(res.error.details).length > 0) {
                setErrors(res.error.details as ErrorDetails)
                return
            } else {
                Alert.alert(res.error.message)
            }
        } else {
            Alert.alert("Successfully signed up")
            if (navigation.canGoBack())
                navigation.goBack()
        }
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }]}>
            <View style={{ padding: 8 }}>
                <Image source={require("../assets/images/robot.png")} height={height * .25} width={width * .25} />
            </View>

            <View style={{ width: "100%", gap: 8 }}>
                <AppTextInput textInput={{
                    value: username,
                    onValueChange: (e => { setUsername(e) }),
                    style: { height: height * .06 },
                    placeholder: "Username"
                }} />
                {errors.username && (
                    <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.username}</Text>
                )}

                <AppTextInput textInput={{
                    value: email,
                    onValueChange: (e => { setEmail(e) }),
                    style: { height: height * .06 },
                    placeholder: "Email",
                    keyboardType: "email-address",
                    textContentType: "emailAddress"
                }} />

                {errors.email && (
                    <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.email}</Text>
                )}

                <AppTextInput textInput={{
                    value: password,
                    onValueChange: (e => { setPassword(e) }),
                    style: { height: height * .06 },
                    placeholder: "Password",
                    secureTextEntry: showPassword,
                    rightIconName: showPassword ? "eye" : "eye-slash",
                    onRightIconPress: () => { setShowPassword(!showPassword) },
                    keyboardType: "visible-password",
                    textContentType: "password"
                }} />

                {errors.password && (
                    <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.password}</Text>
                )}

                <AppTextInput textInput={{
                    value: passwordAgain,
                    onValueChange: (e => { setPasswordAgain(e) }),
                    style: { height: height * .06 },
                    placeholder: "PasswordAgain",
                    secureTextEntry: showPasswordAgain,
                    rightIconName: showPasswordAgain ? "eye" : "eye-slash",
                    onRightIconPress: () => { setShowPasswordAgain(!showPasswordAgain) },
                    keyboardType: "visible-password",
                    textContentType: "password"
                }} />

                {errors.passwordAgain && (
                    <Text style={[styles.LABEL_SMALL, { color: theme.error }]}>{errors.passwordAgain}</Text>
                )}

                <TouchableOpacity onPress={signUp} style={{ backgroundColor: theme.primary[500], padding: 16, borderRadius: 4, width: "100%" }}>
                    <Text style={[styles.LABEL_LARGE, { color: theme.textColor2, textAlign: "center" }]}>Sign up</Text>
                </TouchableOpacity>

                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={[styles.LABEL_MEDIUM, { color: theme.textColor }]}>
                        You already have a account ?
                    </Text>

                    <TouchableOpacity onPress={() => {
                        if (navigation.canGoBack())
                            navigation.goBack()
                    }}>
                        <Text style={[styles.LABEL_MEDIUM, { color: theme.secondary[500] }]}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}