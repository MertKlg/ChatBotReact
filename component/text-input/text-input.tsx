import { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../common/theme";
import FontAwesome6, { FontAwesome6RegularIconName } from "@react-native-vector-icons/fontawesome6";


interface AppTextInput extends TextInputProps {
    leftIconName?: FontAwesome6RegularIconName;
    rightIconName?: FontAwesome6RegularIconName;
    iconSize?: number;
    iconColor?: string;
    onRightIconPress?: () => void;
    onValueChange: (value: string) => void
    value: string,
}

const AppTextInput = ({ textInput }: { textInput: AppTextInput }) => {
    const theme = useTheme()
    const [focused, setFocused] = useState(false)
    return <View style={{
        borderRadius: 4,
        flexDirection: 'row', alignItems: "center", borderColor: textInput.editable ? theme.primary[50] : focused ? theme.primary[500] : theme.primary[400],
        borderWidth: textInput.editable ? 1 : focused ? 2 : 1,
    }} >
        {textInput.leftIconName && (
            <FontAwesome6 name={textInput.leftIconName} size={textInput.iconSize ?? 24} color={textInput.iconColor ?? theme.textColor} style={{ padding: 8 }} />
        )}


        <TextInput
            secureTextEntry={textInput.secureTextEntry}
            placeholder={textInput.placeholder}
            onChangeText={textInput.onValueChange}
            value={textInput.value}
            textContentType={textInput.textContentType}
            keyboardType={textInput.keyboardType}
            onFocus={e => setFocused(true)}
            onBlur={e => setFocused(false)}
            editable={textInput.editable}
            placeholderTextColor={theme.primary[400]}
            style={[textInput.style, {
                flex: 1,
                color: theme.textColor,
                paddingLeft: textInput.leftIconName ? 0 : 8,
                paddingRight: textInput.rightIconName ? 0 : 8,
            }]} />

        {
            textInput.rightIconName && (
                <TouchableOpacity onPress={textInput.onRightIconPress}>
                    <FontAwesome6 name={textInput.rightIconName} size={textInput.iconSize ?? 24} color={textInput.iconColor ?? theme.textColor} style={{ padding: 8 }} />
                </TouchableOpacity>
            )}
    </View>
}

export default AppTextInput;