import { Text, View } from "react-native";
import IChat from "../../model/chat";
import { styles } from "../../common/global-styles";
import { useTheme } from "../../common/theme";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

export default ({ chat }: { chat: IChat }) => {
    const theme = useTheme()
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", backgroundColor: theme.surface, borderRadius: 4, marginTop: 4, marginBottom: 4, padding: 12 }}>
            <View>
                <Text style={[styles.HEADLINE_SMALL, { color: theme.textColor }]}>{chat.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <FontAwesome6 name="user" size={12} color={theme.textColor} iconStyle="solid" />
                    <Text style={[styles.BODY_SMALL, { color: theme.textColor }]}>{chat.owner}</Text>
                </View>
            </View>
            <FontAwesome6 name="angle-right" size={24} color={theme.textColor} iconStyle="solid" />
        </View>
    )
}