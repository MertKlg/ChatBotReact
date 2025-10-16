import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/home';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { SplashScreen } from './pages/splash';
import { SignInScreen } from './pages/sign-in';
import { SignUpScreen } from './pages/sign-up';
import { AppColors } from './common/color';
import { ThemeProvider } from './common/theme';
import { ChatDetail } from './pages/chat-detail';
import { RootStackNavigatorList } from './model/navigator';
import { HeaderBackground } from '@react-navigation/elements';
import { CreateChat } from './pages/chat/create';


function App() {
  const theme = useColorScheme()

  const Stack = createNativeStackNavigator<RootStackNavigatorList>()
  const background = theme === 'dark' ? AppColors.dark.background : AppColors.light.background
  const tintColor = theme === 'dark' ? AppColors.dark.textColor : AppColors.light.textColor

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
              <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name='Home' component={HomeScreen} options={({ navigation }) => ({ headerShown: true, headerTintColor: tintColor, headerBackground: () => <HeaderBackground style={{ backgroundColor: background }} /> })} />
              <Stack.Screen name='SignIn' component={SignInScreen} options={{ headerShown: false }} />
              <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
              <Stack.Screen name='ChatDetail' component={ChatDetail} options={({ route }) => ({ title: route.params.chat?.title ?? "No chat founded", headerBackTitle: "Back", headerShown: true, headerTintColor: tintColor, headerBackground: () => <HeaderBackground style={{ backgroundColor: background }} /> })} />
              <Stack.Screen name='CreateChat' component={CreateChat} options={{ headerBackTitle: "Back", title: "Create Chat", headerShown: true, headerTintColor: tintColor, headerBackground: () => <HeaderBackground style={{ backgroundColor: background }} /> }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
