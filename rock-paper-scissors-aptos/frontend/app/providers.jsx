'use client'

import { MantineProvider } from '@mantine/core'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from 'petra-plugin-wallet-adapter'

const wallets = [new PetraWallet()]

export default function Providers ({ children }) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={true}
        optInWallets={['Petra']}
        dappConfig={{
          network: 'testnet'
        }}
        onError={(error) => {
          console.log('Aptos Wallet Adapter error', error)
        }}
      >
        {children}
      </AptosWalletAdapterProvider>
    </MantineProvider>
  )
}
