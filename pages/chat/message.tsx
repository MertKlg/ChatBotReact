import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { RootStackNavigatorList } from "../../model/navigator"
import { useEffect, useState } from "react"
import { API_BASE_URL, apiClientWithHandler } from "../../common/api"
import IChat, { GetChatMessage } from "../../model/chat"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import AppTextInput from "../../component/text-input/text-input"
import FontAwesome6 from "@react-native-vector-icons/fontawesome6"
import { io, Socket } from "socket.io-client"



type Props = NativeStackScreenProps<RootStackNavigatorList, 'ChatMessage'>

export const ChatMessage = ({ route, navigation }: Props) => {
    const [messages, setMessages] = useState<GetChatMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<Socket>()
    const theme = useTheme()
    const [message, setMessage] = useState("")
    const dimension = useWindowDimensions()


    useEffect(() => {
        // Get user's specific chat messages
        (async () => {
            setLoading(true)
            const chat = route.params.chat
            if (chat)
                await getMessages(chat)

            setLoading(false)
        })()
    }, [])

    const getMessages = async (chat: IChat) => {
        const url = `/chat/message/{${chat.id}/page=1&limit=50`
        const result = await apiClientWithHandler<{ messages: GetChatMessage[] }>({ url: url, method: "GET" })
        console.log(result.data)
        if (result.data) {
            setMessages(result.data.messages)
            // Create a socket.io connection
            createSocketConnection()
        }
    }

    const createSocketConnection = () => {
        const socket = io(API_BASE_URL)
        if (socket.connected)
            setSocket(socket)

        console.log(socket.connected)
    }

    const disconnectSocket = () => {
        if (socket)
            socket.disconnect()
    }

    return (
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0} style={[styles.screen, { backgroundColor: theme.background }]} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    {(loading === true ? <ActivityIndicator size={"large"} /> : <Text>Welcome to the messages screen</Text>)}
                </View>
            </ScrollView>

            <View style={style.inputContainer}>
                <View style={style.textInputWrapper}>
                    <AppTextInput textInput={{
                        value: message,
                        onValueChange: setMessage,
                        placeholder: "Message...",
                        editable: !loading,
                        style: style.textInput
                    }} />
                </View>

                <View style={style.buttonWrapper}>
                    <TouchableOpacity style={[style.button, { backgroundColor: theme.secondary[500] }]}>
                        <FontAwesome6 name="paper-plane" color={theme.textColor} size={16} iconStyle="solid" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    buttonWrapper: {},
    inputContainer: {
        flexDirection: 'row',
        alignItems: "center"
    },
    textInputWrapper: {
        flex: 1,
        marginRight: 10
    },
    textInput: {
        padding: 12
    },
    button: {
        borderRadius: 999,
        padding: 12,
        alignContent: "center"
    }
})