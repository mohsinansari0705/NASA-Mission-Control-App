import { Audio } from 'expo-av';

const cache = new Map<string, Audio.Sound>();
let assets: Record<string, any> = {};

export function registerSoundAssets(map: Record<string, any>) {
  assets = { ...assets, ...map };
}

export async function loadSound(name: string) {
  if (cache.has(name)) return cache.get(name)!;

  const asset = assets[name];
  if (!asset) throw new Error(`Sound asset not registered: ${name}`);

  const { sound } = await Audio.Sound.createAsync(asset);
  cache.set(name, sound);

  return sound;
}

export async function playSound(name: string) {
  try {
    const sound = await loadSound(name);
    if ((sound as any).replayAsync) {
      await (sound as any).replayAsync();
    } else {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    }
  } catch {
    // shallow errors
  }
}

export async function unloadAll() {
  const unloads = Array.from(cache.values()).map((s) =>
    s.unloadAsync().catch(() => {})
  );
  await Promise.all(unloads);

  cache.clear();
}
