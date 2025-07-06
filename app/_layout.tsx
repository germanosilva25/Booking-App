import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Usuarios from './usuarios';
import ListaUsuarios from './usuarios';
import ListaAgendamentos from './agendamento';
import FormularioAgendamento from './criarAgendamento';
// import EditarUsuario from './editarUsuario';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack
          name="usuarios"
          component={ListaUsuarios} // 👈 aqui!
          options={{ headerShown: true, title: "Usuários" }}
        />
        <Stack
          name="agendamentos"
          component={ListaAgendamentos} // 👈 aqui!
          options={{ headerShown: true, title: "Usuários" }}
        />
        <Stack
          name="FormularioAgendamento"
          component={FormularioAgendamento}
          options={{ headerShown: true, title: 'Criando Agendamento' }}
        />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
