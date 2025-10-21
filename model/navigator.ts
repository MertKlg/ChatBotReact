import IChat from "./chat"
import IProfile from "./profile"


export type RootStackNavigatorList = {
    Home: undefined,
    Splash: undefined,
    SignIn: undefined,
    SignUp: undefined,
    CreateChat: undefined,
    Profile: undefined,
    UpdateProfile: {
        profile: IProfile | undefined
    },
    ChatMessage: {
        chat: IChat | undefined
    },
    ChatDetail: {
        chat: IChat | undefined
    }
}