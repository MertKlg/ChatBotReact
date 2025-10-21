import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { RootStackNavigatorList } from "../../model/navigator"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import { useEffect, useState } from "react"
import { apiClientWithHandler } from "../../common/api"
import IChat, { GetChatParticipantsDetails } from "../../model/chat"
import ParticipantsItem from "../../component/card/participants-item"


// NOTE : Chat detail might be shows user's participants and some chat created at informations
type Props = NativeStackScreenProps<RootStackNavigatorList, 'ChatDetail'>
export const ChatDetail = ({ route, navigation }: Props) => {
    const theme = useTheme()
    const [participants, setParticipants] = useState<GetChatParticipantsDetails[]>()
    const [loading, setLoading] = useState(true)

    // Get chat details
    useEffect(() => {
        (async () => {
            setLoading(true)
            const chat = route.params.chat
            if (chat) {
                await getChatDetail(chat)
            }
        })()
    }, [])

    const getChatDetail = async (chat: IChat) => {
        const result = await apiClientWithHandler<{ details: GetChatParticipantsDetails[] }>({ url: `/chat/details/${chat.id}`, method: "GET" })
        if (result.error) {
            Alert.alert(result.error.message)
        } else {
            setParticipants(result.data?.details)
        }
        setLoading(false)
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background, alignItems: "center" }]}>
            {(loading === true ? <ActivityIndicator size={"large"} />
                : participants === undefined ? <Text style={[styles.DISPLAY_SMALL, { color: theme.textColor }]}>No chat founded</Text> : <View style={{ width: "100%", gap: 20 }}>
                    <Text style={[styles.DISPLAY_SMALL, { color: theme.textColor }]}>Chat participants</Text>
                    <FlatList style={{ width: "100%", height: "100%" }} data={participants} renderItem={(e) => <ParticipantsItem item={e.item} />} />
                </View>)}
        </View>
    )
}

const style = StyleSheet.create({

})