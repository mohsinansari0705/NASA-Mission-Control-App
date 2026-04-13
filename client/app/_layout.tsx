import React, { useState } from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '../components/common/Header';
import { ThemeProvider } from '../theme/ThemeContext';
import { SetImage } from '../components/ImageBackground';
import { AppBottomBar } from '../components/common/AppBottomBar';
import { registerSoundAssets } from '../common/sound/SoundManager';
import { AppContext, ContextData } from '../common/context/AppContext';
import { LayoutContext, LayoutData } from '../common/context/LayoutContext';

export default function App() {
  const [context, setContext] = useState(new ContextData());
  const [layoutContext, setLayoutContext] = useState(new LayoutData());

  registerSoundAssets({
    abort: require('../assets/sound/abort.mp3'),
    click: require('../assets/sound/click.mp3'),
    deploy: require('../assets/sound/deploy.mp3'),
    success: require('../assets/sound/success.mp3'),
    typing: require('../assets/sound/typing.mp3'),
    warning: require('../assets/sound/warning.mp3'),
  });

  const [fontsLoaded] = useFonts({
    SairaStencil_400Regular: require('../assets/fonts/SairaStencil-Regular.ttf'),
    Ubuntu_400Regular: require('../assets/fonts/Ubuntu-Regular.ttf'),
  });
  if (!fontsLoaded) return null;


  return (
    <>
      <StatusBar style='light' translucent backgroundColor='transparent' animated />

      <SafeAreaProvider>
        <ThemeProvider>
          <LayoutContext.Provider value={{ layoutContext, setLayoutContext }}>
            <AppContext.Provider value={{ context, setContext }}>
              <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <SetImage />
                <View
                  style={{
                    flex: 1,
                    paddingTop: layoutContext.headerHeight,
                    paddingBottom: layoutContext.bottomBarVisible ? layoutContext.bottomBarHeight : 0,
                  }}
                >
                  <Slot />
                </View>

                <Header />
                <AppBottomBar basePath='/' />
              </SafeAreaView>
            </AppContext.Provider>
          </LayoutContext.Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
