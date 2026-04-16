import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Launch } from '@/common/types/types';
import { useTheme } from '@/theme/ThemeContext';
import { AppContext } from '@/common/context/AppContext';
import { useSoundEffect } from '@/common/sound/useSound';
import { TableComponent } from '@/components/TableComponent';
import { LaunchContainer } from '@/components/LaunchContainer';


export default function UpcomingScreen() {
  const appContext = useContext(AppContext);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const playClick = useSoundEffect('click');
  const playAbort = useSoundEffect('abort');
  const playWarning = useSoundEffect('warning');

  const fetchLaunches = async () => {
    setError(null);
    setLoading(true);

    try {
      const api = appContext.context.api;

      const [launches] = await Promise.all([api.httpGetLaunches()]);
      setLaunches(launches);

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
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator
          size={theme.space.xl * 1.25}
          color={theme.colors.heading}
        />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LaunchContainer>
        <View style={{ flexDirection: 'column', gap: theme.space.lg * 0.75 }}>
          <Text
            style={{
              color: theme.colors.heading,
              fontSize: theme.fontSize.lg * 1.05,
              fontFamily: theme.fonts.ubuntu,
            }}
          >
            Upcoming missions including both SpaceX launches and newly scheduled
            launches from GrayCode rockets.
          </Text>

          <Text
            style={{
              color: theme.colors.heading,
              fontSize: theme.fontSize.lg * 1.05,
              fontFamily: theme.fonts.ubuntu,
            }}
          >
            Warning! Clicking on the ✖ aborts the mission.
          </Text>

          <TableComponent
            data={launches}
            columns={[
              { key: 'abortButton', title: ' ', flex: 1 },
              { key: 'flightNumber', title: 'No.', flex: 3 },
              { key: 'launchDate', title: 'Date', flex: 3 },
              { key: 'mission', title: 'Mission', flex: 4 },
              { key: 'rocket', title: 'Rocket', flex: 3 },
              { key: 'destination', title: 'Destination', flex: 4 },
            ]}
            // onAbort={(l) => {
            //   playAbort();
            //   setLaunches((prev) => prev.filter((x) => x.flightNumber !== l.flightNumber));
            // }}
          />
        </View>
      </LaunchContainer>
    </SafeAreaView>
  );
}
