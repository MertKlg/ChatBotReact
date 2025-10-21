import { StyleSheet, Text, View } from "react-native";
import { GetChatParticipantsDetails } from "../../model/chat";
import { useTheme } from "../../common/theme";
import { styles } from "../../common/global-styles";

export default ({ item }: { item: GetChatParticipantsDetails }) => {
    const theme = useTheme()
    return (
        <View style={[style.container, { backgroundColor: theme.surface }]}>
            <Text style={[styles.BODY_MEDIUM, { color: theme.textColor }]}>{item.participant_name}</Text>
            <Text style={[styles.LABEL_MEDIUM, { color: theme.textColor }]}>{item.role.toUpperCase()}</Text>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        padding: 16,
        margin: 4,
        borderRadius: 4
    }
})