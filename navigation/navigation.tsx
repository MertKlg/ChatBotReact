
import { Button, useColorScheme } from "react-native";
import { RootStackNavigatorList } from "../model/navigator";
import { SignInScreen } from "../pages/sign-in"
import { SignUpScreen } from "../pages/sign-up"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppColors } from "../common/color";
import { ProfileScreen } from "../pages/profile/profile";
import { ChatMessage } from "../pages/chat/message";
import { ChatDetail } from "../pages/chat/detail";
import { CreateChat } from "../pages/chat/create";
import { UpdateProfile } from "../pages/profile/update";
import { HeaderBackground } from "@react-navigation/elements";
import { HomeScreen } from "../pages/home";

const Stack = createNativeStackNavigator<RootStackNavigatorList>()

export const AuthNavigation = () => {

    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export const MainNavigation = () => {
    const theme = useColorScheme()
    const background = theme === 'dark' ? AppColors.dark.background : AppColors.light.background
    const tintColor = theme === 'dark' ? AppColors.dark.textColor : AppColors.light.textColor

    const headerBackground = <HeaderBackground style={{ backgroundColor: background }} />
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='Home' component={HomeScreen} options={({ navigation }) => ({
                headerShown: true,
                headerTintColor: tintColor,
                headerBackground: () => headerBackground,
                headerRight: () => <Button title='Profile' onPress={() => navigation.navigate('Profile')} />
            })} />
            <Stack.Screen name='Profile' component={ProfileScreen} options={({ navigation }) => ({
                headerBackground: () => headerBackground,
                headerBackTitle: 'Back',
                headerTintColor: tintColor
            })} />
            <Stack.Screen name='ChatMessage' component={ChatMessage}
                options={({ route, navigation }) => ({
                    title: route.params.chat?.title ?? "No chat founded",
                    headerBackTitle: "Back",
                    headerShown: true,
                    headerTintColor: tintColor,
                    headerBackground: () => headerBackground,
                    headerRight: () => <Button title='Detail' onPress={() => navigation.navigate('ChatDetail', { chat: route.params.chat })} />
                })} />

            <Stack.Screen name='ChatDetail' component={ChatDetail}
                options={({ route }) => ({
                    title: route.params.chat?.title ?? "No chat founded",
                    headerBackTitle: "Back",
                    headerShown: true,
                    headerTintColor: tintColor,
                    headerBackground: () => headerBackground
                })} />
            <Stack.Screen name='CreateChat' component={CreateChat}
                options={{
                    headerBackTitle: "Back",
                    title: "Create Chat",
                    headerShown: true,
                    headerTintColor: tintColor,
                    headerBackground: () => headerBackground
                }} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfile} options={{
                headerBackground: () => headerBackground,
                headerTitle: "Update Profile",
                headerTintColor: tintColor
            }} />
        </Stack.Navigator>
    )
}
