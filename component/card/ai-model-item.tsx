import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import { IAIModel } from "../../model/ai"



export const AiModelItem = ({ data, isSelected, onClick }: { data: IAIModel, isSelected: boolean, onClick: (value: IAIModel) => void }) => {
    const theme = useTheme()
    return (
        <TouchableOpacity onPress={() => onClick(data)}>
            <View style={{ gap: 4, padding: 16, backgroundColor: isSelected ? theme.primary[700] : theme.surface, borderRadius: 12 }}>
                <Text style={[styles.TITLE_MEDIUM, { color: theme.textColor }]}>{data.model_name}</Text>
                <Text style={[styles.LABEL_SMALL, { color: theme.textColor }]}>{data.provider}</Text>
            </View>
        </TouchableOpacity>
    )
}