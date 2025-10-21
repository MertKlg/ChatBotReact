import { DimensionValue, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedbackProps, ViewStyle } from "react-native"
import { useTheme } from "../../common/theme"
import { styles } from "../../common/global-styles"


interface AppButton {
    text: string,
    onPress: () => void,
    buttonStyle?: {
        backgroundColor?: string,
        padding?: number,
        borderRadius?: number,
        width?: DimensionValue,
    },
    textStyle?: {
        fontStyle?: TextStyle,
        styles?: TextStyle
    }
}

export const AppButton = (
    button: AppButton
) => {
    const theme = useTheme()
    return (
        <TouchableOpacity onPress={button.onPress} style={[{ backgroundColor: button.buttonStyle?.backgroundColor ?? theme.primary[500], padding: button.buttonStyle?.padding ?? 16, borderRadius: button.buttonStyle?.borderRadius ?? 4, width: button.buttonStyle?.width ?? "100%" }]} >
            <Text style={[button.textStyle?.fontStyle ?? styles.BODY_LARGE, button.textStyle?.styles]}>{button.text}</Text>
        </TouchableOpacity>
    )
}