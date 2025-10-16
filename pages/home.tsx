import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../common/global-styles"
import { useEffect, useState } from "react"
import request from "../common/api"
import authStorage from "../storage/auth-storage";
import { useTheme } from "../common/theme";
import IChat from "../model/chat";
import ChatItem from "../component/card/chat-item";
import { RootStackNavigatorList } from "../model/navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


type Props = NativeStackScreenProps<RootStackNavigatorList, 'Home'>

export const HomeScreen = ({ navigation }: Props) => {

    const { getAccessToken } = authStorage()
    const theme = useTheme()
    const [chat, setChat] = useState<IChat[]>()

    useEffect(() => {
        (async () => {
            await getChats()
        })()
    }, [])

    const getChats = async () => {
        // Get users chat's

    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
                <Text style={[styles.BODY_LARGE, { color: theme.textColor2, padding: 24, backgroundColor: theme.secondary[500], borderRadius: 4, textAlign: "center" }]} >Create</Text>
            </TouchableOpacity>
            <FlatList
                data={chat}
                renderItem={(e) => <ChatItem chat={e.item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View >
    )
}