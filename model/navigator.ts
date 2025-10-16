import IChat from "./chat"


export type RootStackNavigatorList = {
    Home: undefined,
    Splash: undefined,
    SignIn: undefined,
    SignUp: undefined,
    ChatDetail: {
        chat: IChat | undefined
    },
    CreateChat: undefined
}