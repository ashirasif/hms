
'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react';

export function SeshProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}


export function ThemeProvider() {
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);
  return <></>;
}
