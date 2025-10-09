import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/home';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, TouchableOpacity, useColorScheme, Text } from 'react-native';
import Screens from './common/screens';
import { SplashScreen } from './pages/splash';
import { SignInScreen } from './pages/sign-in';
import { SignUpScreen } from './pages/sign-up';
import { AppColors } from './common/color';
import { ThemeProvider, useTheme } from './common/theme';


function App() {
  const theme = useColorScheme()

  const rootStack = createNativeStackNavigator({
    initialRouteName: Screens.SPLASH,
    screenOptions: {
      headerStyle: {
        backgroundColor: theme === 'dark' ? AppColors.dark.background : AppColors.light.background,
      },
      headerTitleStyle: {
        color: theme === 'dark' ? AppColors.dark.textColor : AppColors.light.textColor,
      }
    },
    screens: {
      HOME: {
        screen: HomeScreen,
        title: "Chat's",
        options: {
          headerShown: true
        }
      },
      SIGN_IN: {
        screen: SignInScreen,
        title: "Sign In",
        options: {
          headerShown: false
        }
      },
      SIGN_UP: {
        screen: SignUpScreen,
        title: "Sign Up",
        options: {
          headerShown: false
        }
      },
      SPLASH: {
        screen: SplashScreen,
        options: {
          headerShown: false,
        }
      }
    }
  })

  const Navigation = createStaticNavigation(rootStack)

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? AppColors.dark.background : AppColors.light.background }}>
          <Navigation />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
