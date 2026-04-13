import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';


export const LaunchContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: theme.space.md }}>
      <View
        style={{
          position: 'relative',
          padding: theme.space.sm,
          width: '100%',
          borderWidth: 2.5,
          borderRadius: theme.space.sm,
          borderColor: theme.colors.panelBorder,
          boxShadow: theme.colors.glow,
        }}
      >
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            padding: theme.space.lg,
            borderWidth: 1.5,
            borderRadius: theme.space.xs,
            borderColor: theme.colors.panelBorderAccent,
            backgroundColor: theme.colors.panel + 'A0',
            overflow: 'hidden',
          }}
        >
          {children}
        </View>

        <View
          style={[
            styles.corner,
            styles.topLeft,
            { borderColor: theme.colors.panelBorderAccent },
          ]}
        />
        <View
          style={[
            styles.corner,
            styles.topRight,
            { borderColor: theme.colors.panelBorderAccent },
          ]}
        />
        <View
          style={[
            styles.corner,
            styles.bottomLeft,
            { borderColor: theme.colors.panelBorderAccent },
          ]}
        />
        <View
          style={[
            styles.corner,
            styles.bottomRight,
            { borderColor: theme.colors.panelBorderAccent },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    width: 28,
    height: 18,
    borderWidth: 3,
    backgroundColor: 'transparent',
  },
  topLeft: {
    left: 6,
    top: 6,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    right: 6,
    top: 6,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    left: 6,
    bottom: 6,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    right: 6,
    bottom: 6,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});
