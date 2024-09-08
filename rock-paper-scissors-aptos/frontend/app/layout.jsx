import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Press_Start_2P } from 'next/font/google'
import './global.css'
import Providers from './providers'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'A Rock Paper Scissors Game'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={pressStart2P.className}>
        <Providers>
          <MantineProvider>
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  )
}
