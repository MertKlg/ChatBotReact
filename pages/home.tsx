import { Alert, Button, FlatList, Text, TextInput, View } from "react-native"
import { styles } from "../common/global-styles"
import { useEffect, useState } from "react"
import request, { refresh } from "../common/api"
import * as Keychain from "react-native-keychain";
import authStorage from "../storage/auth-storage";
import { useTheme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import IChat from "../model/chat";
import { Screen } from "react-native-screens";
import Screens from "../common/screens";
import chatItem from "../component/card/chat-item";
import ChatItem from "../component/card/chat-item";
import { getAppInfo } from "react-native/types_generated/Libraries/LogBox/Data/LogBoxData";


export const HomeScreen = () => {

    const { getAccessToken } = authStorage()
    const theme = useTheme()
    const navivation = useNavigation()
    const [chat, setChat] = useState<IChat[]>()

    useEffect(() => {
        (async () => {
            await getChats()
        })()
    }, [])

    const getChats = async () => {
        // Get users chat's
        const token = getAccessToken()
        console.log(token)
        const result = await request<{ chats: IChat[] }>({ url: "/chat/get", header: { Authorization: `Bearer ${token}` }, method: "GET" })
        if (result.error) {
            if (result.error.status == 401) {
                const refreshResult = await refresh()
                if (refreshResult.error?.status == 401) {
                    Alert.alert("Profile ended")
                    navivation.replace(Screens.SIGN_IN)
                    return
                }
            }
        } else {
            setChat(result.data?.chats)
        }
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <FlatList
                data={chat}
                renderItem={(e) => <ChatItem chat={e.item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}