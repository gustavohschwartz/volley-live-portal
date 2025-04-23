import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Vôlei Ao Vivo',
  description: 'Resultados de partidas de vôlei em tempo real',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}