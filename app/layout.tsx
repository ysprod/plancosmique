import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plan Cosmique - Voyance & Prédictions',
  description: 'Explorez votre destinée à travers l\'univers avec Plan Cosmique',
  keywords: 'voyance, prédictions, astrologie, tarot, numérologie, cosmos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
