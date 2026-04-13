import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';

export const SetImage = () => {
  const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
    Dimensions.get('window');

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
      }}
      resizeMode='cover'
      imageStyle={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
    />
  );
};
