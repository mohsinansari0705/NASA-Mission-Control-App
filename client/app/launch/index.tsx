import React, { useState, useContext, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { useSoundEffect } from '../../common/sound/useSound';
import { AppContext } from '../../common/context/AppContext';
import { LaunchContainer } from '../../components/LaunchContainer';

export default function LaunchScreen() {
  const appContext = useContext(AppContext);
  const [planets, setPlanets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState(new Date());
  const [missionName, setMissionName] = useState('');
  const [rocketType, setRocketType] = useState('Explorer IS1');
  const [destination, setDestination] = useState<string>('');

  const theme = useTheme();
  const playClick = useSoundEffect('click');
  const playAbort = useSoundEffect('abort');
  const playTyping = useSoundEffect('typing');
  const playSuccess = useSoundEffect('success');


  const fetch = async () => {
    setError(null);
    setLoading(true);

    try {
      const api = appContext.context.api;

      const [planets] = await Promise.all([
        api.httpGetPlanets(),
      ]);
      if (planets) {
        setPlanets(planets.map((p: any) => p.kepler_name));
      }

      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={theme.space.xl * 1.25} color={theme.colors.heading} />
      </SafeAreaView>
    )
  }

  const showDatePicker = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onValueChange: (event, selectedDate) => setDate(selectedDate),
      mode: currentMode,
      // is24Hour: true,
    });
  };

  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <LaunchContainer>
        <View style={{ flexDirection: 'column', gap: theme.space.lg * 0.75 }}>
          <Text style={{ color: theme.colors.heading, fontSize: theme.fontSize.lg * 1.05, fontFamily: theme.fonts.ubuntu }}>
            Schedule a mission launch for Interstellar travel to one of the
            Kepler Exoplanets.
          </Text>

          <Text style={{ color: theme.colors.heading, fontSize: theme.fontSize.lg * 1.05, fontFamily: theme.fonts.ubuntu }}>
            Only confirmed planets matching the following criteria are available
            for the earliest scheduled missions: █
          </Text>

          <View style={{ flexDirection: 'column', gap: theme.space.xs * 1.5, paddingLeft: theme.space.md }}>
            <Text style={{ color: theme.colors.heading, fontSize: theme.fontSize.md, fontFamily: theme.fonts.ubuntu }}>
              • Planetary radius &lt; 1.6 times Earth's radius
            </Text>
            <Text style={{ color: theme.colors.heading, fontSize: theme.fontSize.md, fontFamily: theme.fonts.ubuntu }}>
              • Effective stellar flux &gt; 0.36 times Earth's value and &lt;
              1.11 times Earth's value
            </Text>
          </View>

          <View style={{ gap: theme.space.md }}>
            <View style={{ gap: theme.space.xs * 1.25 }}>
              <Text style={{ color: theme.colors.heading, fontFamily: theme.fonts.sairaStencil, fontSize: theme.fontSize.md }}>
                Launch Date
              </Text>

              <TouchableOpacity
                onPress={() => {
                  playClick();
                  showDatePicker('date');
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: theme.space.sm,
                  borderWidth: 1,
                  borderRadius: theme.space.xs * 1.5,
                  borderColor: theme.colors.panelBorder,
                  backgroundColor: theme.colors.panel,
                }}
              >
                <Text style={{ color: theme.colors.heading, fontFamily: theme.fonts.sairaStencil }}>
                  {date.toISOString().slice(0, 10)}
                </Text>
                <Fontisto
                  name='date'
                  size={theme.space.md}
                  color={theme.colors.heading}
                />
              </TouchableOpacity>
            </View>

            <View style={{ gap: theme.space.xs * 1.25 }}>
              <Text style={{ color: theme.colors.heading, fontFamily: theme.fonts.sairaStencil, fontSize: theme.fontSize.md }}>
                Mission Name
              </Text>

              <TextInput
                value={missionName}
                placeholder='Enter mission name'
                placeholderTextColor={theme.colors.muted}
                onChangeText={(text) => {
                  playTyping();
                  setMissionName(text);
                }}
                onFocus={() => {
                  playClick();
                }}
                style={{
                  fontFamily: theme.fonts.sairaStencil,
                  padding: theme.space.sm,
                  borderWidth: 1,
                  borderRadius: theme.space.xs * 1.5,
                  color: theme.colors.heading,
                  borderColor: theme.colors.panelBorder,
                  backgroundColor: theme.colors.panel,
                }}
              />
            </View>

            <View style={{ gap: theme.space.xs * 1.25 }}>
              <Text style={{ color: theme.colors.heading, fontFamily: theme.fonts.sairaStencil, fontSize: theme.fontSize.md }}>
                Rocket Type
              </Text>

              <TextInput
                value={rocketType}
                placeholder='Rocket Type'
                placeholderTextColor={theme.colors.muted}
                onChangeText={(text) => {
                  setRocketType(text);
                  playTyping();
                }}
                onFocus={() => {
                  playClick();
                }}
                style={{
                  fontFamily: theme.fonts.sairaStencil,
                  padding: theme.space.sm,
                  borderWidth: 1,
                  borderRadius: theme.space.xs * 1.5,
                  color: theme.colors.heading,
                  borderColor: theme.colors.panelBorder,
                  backgroundColor: theme.colors.panel,
                }}
              />
            </View>

            <View style={{ gap: theme.space.xs * 1.25 }}>
              <Text style={{ color: theme.colors.heading, fontFamily: theme.fonts.sairaStencil, fontSize: theme.fontSize.md }}>
                Destination Exoplanet
              </Text>

              <Picker
                selectedValue={destination}
                onValueChange={(val) => {
                  setDestination(val);
                  playClick();
                }}
                onPointerEnter={() => {
                  playClick();
                }}
                style={{
                  fontFamily: theme.fonts.sairaStencil,
                  padding: theme.space.sm,
                  borderWidth: 1,
                  borderRadius: theme.space.xs * 1.5,
                  color: theme.colors.heading,
                  borderColor: theme.colors.panelBorder,
                  backgroundColor: theme.colors.panel,
                }}
              >
                {planets.map((p) => (
                  <Picker.Item key={p} label={p} value={p} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              borderWidth: 2,
              borderRadius: theme.space.xs * 2,
              borderColor: theme.colors.buttonBorder,
              paddingVertical: theme.space.sm * 1.25,
              paddingHorizontal: theme.space.lg * 0.75,
              backgroundColor: theme.colors.buttonBackground,
            }}
            onPress={() => {
              // TODO: wire up submit action
              console.log('Launch:', {
                date,
                missionName,
                rocketType,
                destination,
              });
            }}
          >
            <Text style={{ color: theme.colors.buttonText, fontFamily: theme.fonts.sairaStencil, fontWeight: '600' }} >
              Launch Mission ✓
            </Text>
          </TouchableOpacity>
        </View>
      </LaunchContainer>

      <Text
        style={{
          textAlign: 'center',
          color: theme.colors.heading,
          fontFamily: theme.fonts.sairaStencil,
          fontSize: theme.fontSize.sm,
          paddingVertical: theme.space.sm,
        }}
      >
        This is not an official app and is not affiliated with NASA or SpaceX in any way. For educational purposes only.
      </Text>
    </SafeAreaView>
  );
}
