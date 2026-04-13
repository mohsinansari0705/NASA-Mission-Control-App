import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable, View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeContext';
import { useSoundEffect } from '../../common/sound/useSound';
import { LayoutContext } from '../../common/context/LayoutContext';


const TABS = [
  { id: 'launch', icon: 'check-circle-outline' as const },
  { id: 'upcoming', icon: 'update' as const },
  { id: 'history', icon: 'history' as const },
] as const;

export function AppBottomBar({ basePath = '/' }: { basePath: string }) {
  const { layoutContext, setLayoutContext } = useContext(LayoutContext);
  const { colors, space, fonts, fontSize } = useTheme();
  const play = useSoundEffect('click');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!layoutContext.bottomBarVisible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          bottom: insets.bottom,
          paddingVertical: space.sm,
          backgroundColor: 'transparent',
          boxShadow: '0px 2px 8px 8px rgba(0, 0, 0, 0.12)',
        }}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h !== layoutContext.bottomBarHeight) {
            setLayoutContext((old) =>
              old.setBottomBar(old, undefined, undefined, h)
            );
          }
        }}
      >
        {TABS.map((tab) => {
          const tabName = tab.id.charAt(0).toUpperCase() + tab.id.slice(1);
          const active = layoutContext.bottomBarSelectedId === tab.id;

          return (
            <Pressable
              key={tab.id}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: space.sm,
                paddingVertical: space.xs,
                marginHorizontal: space.lg,
                backgroundColor: active ? colors.panel : 'transparent',
              }}
              onPress={() => {
                play();
                router.navigate(basePath + tab.id);
                setLayoutContext((old) =>
                  old.setBottomBar(old, undefined, tab.id)
                );
              }}
            >
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                  name={tab.icon}
                  size={space.md * 1.35}
                  color={active ? colors.logoBlue : colors.muted}
                />
              </View>

              <Text style={{ fontSize: fontSize.xs * 1.15, fontFamily: fonts.sairaStencil, color: active ? colors.logoBlue : colors.muted }}>
                {tabName}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
