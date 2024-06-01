'use client';
import { useEffect } from 'react';

import { useConfig } from '@/hooks/use-config';

export function ThemeSwitcher() {
  const [config] = useConfig();

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    // Remove all existing theme-related classes
    const themeClasses = Array.from(body.classList).filter(className =>
      className.startsWith('theme-')
    );
    body.classList.remove(...themeClasses);

    const fontClass = Array.from(body.classList).filter(className =>
      className.startsWith('className__')
    );
    body.classList.remove(...fontClass);

    // Apply the selected theme class
    body.classList.add(`theme-${config.theme}`);

    // Apply the background classes
    if (config.gradient) {
      body.classList.add('bg-gradient-to-r-m', 'lg:bg-gradient-to-r');
    } else {
      body.classList.add('bg-background');
    }

    // Set the radius CSS variable
    root.style.setProperty('--radius', `${config.radius}rem`);

    return () => {
      body.classList.remove(`theme-${config.theme}`);
      body.classList.remove('bg-gradient-to-r-m', 'lg:bg-gradient-to-r');
      body.classList.remove('bg-background');
    };
  }, [config]);

  return null;
}
