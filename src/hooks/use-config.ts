import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Theme } from '@/styles/themes';

type Config = {
  theme: Theme['name'];
  radius: number;
  gradient: boolean;
};

const DEFAULT_CONFIG: Config = {
  theme: 'zinc',
  radius: 0.75,
  gradient: false,
};

export function useConfig(): [Config, (config: Config) => void] {
  const [storedConfig, setStoredConfig] = useAtom(configAtom);

  // Check if the stored config is valid, if not, use the default config and update local storage
  if (!isConfigValid(storedConfig)) {
    setStoredConfig(DEFAULT_CONFIG);
  }

  return useAtom(configAtom);
}

function isConfigValid(config: Config): boolean {
  // Add your validation logic here
  // For example, check if all required fields are present and have valid values
  return (
    !!config.theme &&
    typeof config.radius === 'number' &&
    typeof config.gradient === 'boolean'
  );
}

const configAtom = atomWithStorage<Config>('config', {
  theme: 'zinc',
  radius: 0.75,
  gradient: false,
});
