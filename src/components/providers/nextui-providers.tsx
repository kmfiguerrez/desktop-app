// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/system'

export function NextUiProviders({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}