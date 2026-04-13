import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { LayoutContext } from '../../common/context/LayoutContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const Header = () => {
  const { layoutContext, setLayoutContext } = useContext(LayoutContext);
  const { colors, space, fonts, fontSize } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'transparent',
      }}
      onLayout={(e) => {
        const h = e.nativeEvent.layout.height;
        if (h !== layoutContext.headerHeight) {
          setLayoutContext((old) => old.setHeader(old, h));
        }
      }}
    >
      <View
        style={{
          paddingTop: insets.top,
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.md,
          paddingHorizontal: space.md,
          paddingVertical: space.sm * 1.25,
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: 40, height: 40, marginTop: space.sm * 1.25 }}
        />
        <Text style={{ color: colors.heading, fontSize: fontSize.lg * 1.25, fontFamily: fonts.sairaStencil, marginTop: space.sm * 1.25 }}>
          NASA Mission Control
        </Text>
      </View>

      <View style={{ height: space.xs * 0.75, backgroundColor: colors.muted, marginBottom: space.md }}/>
    </View>
  );
};
