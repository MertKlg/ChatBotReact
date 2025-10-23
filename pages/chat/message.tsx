import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { RootStackNavigatorList } from "../../model/navigator"
import { useEffect, useState } from "react"
import { API_BASE_URL, apiClientWithHandler } from "../../common/api"
import IChat, { GetChatMessageResult } from "../../model/chat"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import AppTextInput from "../../component/text-input/text-input"
import FontAwesome6 from "@react-native-vector-icons/fontawesome6"
import { io, Socket } from "socket.io-client"
import ChatMessageItem from "../../component/card/chat-message-item"
import authStorage from "../../storage/auth-storage"



type Props = NativeStackScreenProps<RootStackNavigatorList, 'ChatMessage'>

export const ChatMessage = ({ route, navigation }: Props) => {
    const [messages, setMessages] = useState<GetChatMessageResult[]>([])
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
    }, [route.params.chat])

    const getMessages = async (chat: IChat) => {
        const result = await apiClientWithHandler<{ messages: GetChatMessageResult[] }>({ url: '/chat/' + chat.id + '/message', method: "GET" })
        if (result.data) {
            setMessages(result.data.messages)
            createSocketConnection()
        }
    }

    const createSocketConnection = () => {
        const socket = io(API_BASE_URL, { auth: { token: authStorage.getState().getAccessToken() } })
        if (socket.connected) {
            setSocket(socket)


        }

    }

    const disconnectSocket = () => {
        if (socket)
            socket.disconnect()
    }

    return (
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0} style={[styles.screen, { backgroundColor: theme.background }]} >
            <View style={{ flex: 1 }}>
                {(loading === true ? <ActivityIndicator size={"large"} />
                    : <FlatList data={messages} renderItem={(e) => <ChatMessageItem item={e.item} />} />)}
            </View>

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