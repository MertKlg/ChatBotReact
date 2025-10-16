import { View, Text, useWindowDimensions, TouchableOpacity, FlatList } from "react-native"
import { styles } from "../../common/global-styles"
import { useTheme } from "../../common/theme"
import AppTextInput from "../../component/text-input/text-input"
import { useEffect, useState } from "react"
import { apiClientWithHandler } from "../../common/api"
import { IAIModel } from "../../model/ai"
import { AiModelItem } from "../../component/card/ai-model-item"

export const CreateChat = () => {
    const theme = useTheme()
    const [title, setTitle] = useState("")
    const dimension = useWindowDimensions()
    const height = dimension.height
    const [aiModels, setAiModels] = useState<IAIModel[]>()
    const [selectedAiModel, setSelectedAiModel] = useState<IAIModel[]>([])

    useEffect(() => {
        // Get available ai models
        (async () => {
            await availableAiModels()
        })()
    }, [])

    const availableAiModels = async () => {
        setAiModels([])
        const res = await apiClientWithHandler<{ ai_models: IAIModel[] }>({ url: "/ai/getAll", method: "GET" })
        if (res.data && res.data.ai_models.length > 0) {
            setAiModels(res.data.ai_models)
        }
    }

    const selectAiModel = (model: IAIModel) => {
        const findModel = selectedAiModel.findIndex(e => e === model)
        if (findModel > -1) {
            setSelectedAiModel(items => items.filter(e => e.id !== model.id))
        } else {
            setSelectedAiModel(items => [...selectedAiModel, model])
        }
    }


    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <View style={{ gap: 12 }}>
                <AppTextInput textInput={{ value: title, onValueChange: setTitle, placeholder: "Title", style: { height: height * .06 } }} />
            </View>

            <View style={{ gap: 12, marginTop: 24 }}>
                <Text style={[styles.TITLE_LARGE, { color: theme.textColor }]}>Select AI Model</Text>
                <FlatList
                    data={aiModels}
                    renderItem={(e) => <AiModelItem data={e.item} isSelected={selectedAiModel.find(item => item === e.item) != null} onClick={(e) => selectAiModel(e)} />}
                />
            </View>

            <View style={{ marginTop: 24 }}>
                <TouchableOpacity>
                    <Text style={[styles.LABEL_LARGE, { color: theme.textColor2, padding: 12, borderRadius: 4, textAlign: "center", backgroundColor: theme.primary[500] }]}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}