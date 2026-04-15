import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Launch } from '@/common/types/types';
import { useTheme } from '@/theme/ThemeContext';
import { AppContext } from '@/common/context/AppContext';
import { useSoundEffect } from '@/common/sound/useSound';
import { LaunchContainer } from '@/components/LaunchContainer';


export default function HistoryScreen() {
  const appContext = useContext(AppContext);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const playClick = useSoundEffect('click');

  const fetchLaunches = async () => {
    setError(null);
    setLoading(true);

    try {
      const api = appContext.context.api;

      const [launches] = await Promise.all([api.httpGetLaunches()]);
      setLaunches(launches);
      console.log('Fetched launches:', launches);

      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  if (loading) {
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator
        size={theme.space.xl * 1.25}
        color={theme.colors.heading}
      />
    </SafeAreaView>;
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LaunchContainer>
        <View style={{ flexDirection: 'column', gap: theme.space.lg * 0.75 }}>
          <Text
            style={{
              color: theme.colors.heading,
              fontSize: theme.fontSize.lg * 1.1,
              fontFamily: theme.fonts.ubuntu,
            }}
          >
            History of Mission launches including SpaceX launches starting from
            the year 2006.
          </Text>
        </View>
      </LaunchContainer>
    </SafeAreaView>
  );
}
