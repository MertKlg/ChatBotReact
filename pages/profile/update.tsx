import { Text, useWindowDimensions, View } from "react-native"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import AppTextInput from "../../component/text-input/text-input"
import { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackNavigatorList } from "../../model/navigator"
import { AppButton } from "../../component/button/default"


type Props = NativeStackScreenProps<RootStackNavigatorList, 'UpdateProfile'>
export const UpdateProfile = ({ route, navigation }: Props) => {
    const theme = useTheme()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // Dimension
    const dimension = useWindowDimensions()
    const height = dimension.height

    useEffect(() => {
        // Get user credentials from navigation prop
        const profile = route.params?.profile
        if (profile) {
            setEmail(profile.email)
        }
    }, [])

    // NOTE : update credentials specification could not added for now..
    const updateCredentials = async () => {

    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background, alignItems: "center", gap: 12 }]}>
            <Text style={[styles.HEADLINE_SMALL, { color: theme.textColor }]}>Update Credentials</Text>

            <View style={{ width: "100%", gap: 12 }}>
                <AppTextInput textInput={{
                    value: email,
                    onValueChange: (e) => setEmail(e),
                    placeholder: "Email",
                    style: { height: height * .06 }

                }} />

                <AppTextInput textInput={{
                    value: password,
                    onValueChange: (e) => setPassword(e),
                    placeholder: "Password",
                    style: { height: height * .06 },
                    secureTextEntry: showPassword,
                    rightIconName: showPassword ? "eye" : "eye-slash",
                    onRightIconPress: () => setShowPassword(!showPassword)
                }} />

                <AppButton text="Update" onPress={() => { }} textStyle={{ styles: { textAlign: "center" } }} />
            </View>
        </View>
    )
}