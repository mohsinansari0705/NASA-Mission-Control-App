import { useEffect, useCallback } from 'react';
import * as SoundManager from './SoundManager';

export function useSoundEffect(name: string) {
  useEffect(() => {
    let mounted = true;
    SoundManager.loadSound(name).catch(() => {});

    return () => {
      mounted = false;
    };
  }, [name]);

  const play = useCallback(() => {
    SoundManager.playSound(name);
  }, [name]);

  return play;
}
