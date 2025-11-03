import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { RootStackNavigatorList } from "../../model/navigator"
import { useCallback, useState } from "react"
import { apiClientWithHandler } from "../../common/api"
import IChat, { GetChatMessageResult, PostChatMessageDTO } from "../../model/chat"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import AppTextInput from "../../component/text-input/text-input"
import FontAwesome6 from "@react-native-vector-icons/fontawesome6"
import ChatMessageItem from "../../component/card/chat-message-item"
import { useFocusEffect } from "@react-navigation/native"
import socket from "../../common/socket"
import { IErrorResponse, ISuccessResponse } from "../../model/response"

type Props = NativeStackScreenProps<RootStackNavigatorList, 'ChatMessage'>

export const ChatMessage = ({ route, navigation }: Props) => {
    const [messages, setMessages] = useState<GetChatMessageResult[]>([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme()
    const [message, setMessage] = useState("")

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true)
                const chat = route.params.chat
                if (chat)
                    await getMessages(chat)
            })()

            return () => {
                socket.off("sendMessageSuccess", handleSuccessMessage)
                socket.disconnect()
            }
        }, [route.params.chat])
    )

    const getMessages = async (chat: IChat) => {
        const result = await apiClientWithHandler<{ messages: GetChatMessageResult[] }>({ url: '/chat/' + chat.id + '/message', method: "GET" })
        if (result.data) {
            setMessages(result.data.messages)
            socket.connect()
            socket.on('sendMessageSuccess', handleSuccessMessage)
        } else {
            // Handle error
        }
        setLoading(false)
    }

    const emitMessage = () => {
        socket.emit("sendMessage", { content: message, chat_id: route.params.chat?.id } as PostChatMessageDTO)
    }

    const handleSuccessMessage = (result: ISuccessResponse<GetChatMessageResult[]>) => {

    }

    const handleErrorMessage = (result: IErrorResponse) => {
        console.error(result.message, result.details)
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
                    <TouchableOpacity disabled={false} onPress={() => emitMessage()} style={[style.button, { backgroundColor: theme.secondary[500] }]}>
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