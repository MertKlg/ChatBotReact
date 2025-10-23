import { Text, View } from "react-native";
import { GetChatMessageResult } from "../../model/chat";
import { useTheme } from "../../common/theme";
import { styles } from "../../common/global-styles";


export default ({ item }: { item: GetChatMessageResult }) => {
    const theme = useTheme()
    const fullTime = new Date(item.created_at)
    return (
        <View style={{ backgroundColor: item.is_from_ai ? theme.surface : theme.primary[700], padding: 12, margin: 4, borderRadius: 4 }}>
            <View style={{ alignItems: item.is_from_ai == true ? "flex-start" : "flex-end" }}>
                <Text style={[styles.BODY_LARGE]}>{item.sender_name}</Text>
                <View style={{ justifyContent: "space-between" }}>
                    <Text style={[styles.BODY_MEDIUM, { textAlign: item.is_from_ai ? "left" : "right", paddingBottom: 8, paddingTop: 8 }]}>{item.content}</Text>
                    <Text style={[styles.LABEL_SMALL]}>{fullTime.getDate()}.{fullTime.getMonth()}.{fullTime.getFullYear()} - {fullTime.getHours()}:{fullTime.getMinutes()}</Text>
                </View>
            </View>
        </View>
    )
}