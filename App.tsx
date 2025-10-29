import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { AppColors } from './common/color';
import { ThemeProvider } from './common/theme';
import authStorage from './storage/auth-storage';
import { AuthNavigation, MainNavigation } from './navigation/navigation';


function App() {
  const theme = useColorScheme()
  const background = theme === 'dark' ? AppColors.dark.background : AppColors.light.background

  const token = authStorage(state => state.accessToken)

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
          <NavigationContainer>
            {token === null ? <AuthNavigation /> : <MainNavigation />}
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
