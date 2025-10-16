import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { RootStackNavigatorList } from "../model/navigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import IChat from "../model/chat"
import { styles } from "../common/global-styles"
import { useTheme } from "../common/theme"
import request, { refresh } from "../common/api"
import authStorage from "../storage/auth-storage"


type Props = NativeStackScreenProps<RootStackNavigatorList, 'ChatDetail'>

export const ChatDetail = ({ route, navigation }: Props) => {
    const [chat, setChat] = useState<IChat | undefined>(undefined)
    const theme = useTheme()
    const { getAccessToken } = authStorage()

    useEffect(() => {
        (async () => {
            setChat(route.params.chat)
            // Get chat messages
            await getChatMessages()
        })()

    }, [])

    const goBack = () => {
        if (navigation.canGoBack())
            navigation.goBack()
    }

    const getChatMessages = async () => {
        const result = await request({ url: "/chat/" + chat?.id + "/message/page=1&limit=50", method: "GET", header: { Authorization: `Bearer ${getAccessToken()}` } })
        if (result.error?.status == 401) {
            // User token expired create new one
            const refResult = await refresh()
            if (refResult.error?.status == 401) {
                // Route to sign in page
                navigation.replace("SignIn")
            }
        }

        console.log(result.data)
    }

    if (chat) {
        return (
            <View style={[styles.screen, { backgroundColor: theme.background }]}>
                <Text>{chat.id}</Text>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 8 }}>
                <Text style={[styles.HEADLINE_SMALL, { color: theme.textColor }]}>No chat founded</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={[styles.BODY_SMALL, { borderRadius: 4, width: "100%", color: theme.textColor2, padding: 12, backgroundColor: theme.primary[500] }]}>Go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}