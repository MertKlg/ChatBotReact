import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../common/global-styles"
import { useCallback, useEffect, useState } from "react"
import request, { apiClientWithHandler } from "../common/api"
import authStorage from "../storage/auth-storage";
import { useTheme } from "../common/theme";
import IChat from "../model/chat";
import ChatItem from "../component/card/chat-item";
import { RootStackNavigatorList } from "../model/navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";


type Props = NativeStackScreenProps<RootStackNavigatorList, 'Home'>

export const HomeScreen = ({ navigation }: Props) => {

    const theme = useTheme()
    const [chat, setChat] = useState<IChat[]>()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await getChats()
            })()

            return () => {
                setChat([])
            };
        }, []))

    const getChats = async () => {
        // Get users chat's
        const result = await apiClientWithHandler<{ chats: IChat[] }>({ url: '/chat/getAll', method: 'GET' })
        if (result.data) {
            setChat(result.data.chats)
        }
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
                <FontAwesome6 style={[styles.BODY_LARGE, { color: theme.textColor2, padding: 24, backgroundColor: theme.secondary[500], borderRadius: 4, textAlign: "center" }]} name="plus" size={15} color={theme.textColor2} iconStyle="solid" />
            </TouchableOpacity>
            <FlatList
                data={chat}
                renderItem={(e) => <ChatItem chat={e.item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View >
    )
}