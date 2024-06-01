'use client';
import { CheckIcon, MoonIcon, Paintbrush, SunIcon, Undo2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { useConfig } from '@/hooks/use-config';
import { cn } from '@/lib/utils';
import '@/styles/mdx.css';
import { themes } from '@/styles/themes';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Skeleton } from './ui/skeleton';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        <div className="mr-2 hidden items-center space-x-0.5 md:flex">
          {mounted ? (
            <>
              {['zinc', 'rose', 'blue', 'green', 'orange'].map(color => {
                const theme = themes.find(theme => theme.name === color);
                const isActive = config.theme === color;

                if (!theme) {
                  return null;
                }

                return (
                  <Tooltip key={theme.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          setConfig({
                            ...config,
                            theme: theme.name,
                          })
                        }
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs',
                          isActive
                            ? 'border-[--theme-primary]'
                            : 'border-transparent'
                        )}
                        style={
                          {
                            '--theme-primary': `hsl(${
                              theme?.activeColor[
                                mode === 'dark' ? 'dark' : 'light'
                              ]
                            })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]'
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="h-4 w-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent align="center">
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </>
          ) : (
            <div className="mr-1 flex items-center space-x-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Paintbrush className="mr-2 h-4 w-4" />
              Customize
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Customizer />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Customizer() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex items-start">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for your components.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            setConfig({
              ...config,
              theme: 'zinc',
              radius: 0.5,
              gradient: false,
            });
          }}
        >
          <Undo2 className="h-4 w-4" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map(theme => {
              const isActive = config.theme === theme.name;

              return mounted ? (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    });
                  }}
                  className={cn(
                    'justify-start',
                    isActive && 'border-2 border-primary'
                  )}
                  style={
                    {
                      '--theme-primary': `hsl(${
                        theme?.activeColor[mode === 'dark' ? 'dark' : 'light']
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]'
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Gradient</Label>
          <div className="flex items-center justify-between space-x-2">
            <p className="text-xs">Enable gradient</p>
            <Switch
              checked={config.gradient}
              onCheckedChange={checked => {
                setConfig({
                  ...config,
                  gradient: checked,
                });
              }}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Radius</Label>
          <div className="grid grid-cols-5 gap-2">
            {['0', '0.3', '0.5', '0.75', '1.0'].map(value => {
              return (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: parseFloat(value),
                    });
                  }}
                  className={cn(
                    config.radius === parseFloat(value) &&
                      'border-2 border-primary'
                  )}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('light')}
                  className={cn(mode === 'light' && 'border-2 border-primary')}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('dark')}
                  className={cn(mode === 'dark' && 'border-2 border-primary')}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
