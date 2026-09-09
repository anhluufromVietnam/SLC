import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = { title: 'Suleco Education Workspace', description: 'Nền tảng quản trị đào tạo, hồ sơ học viên và vận hành Suleco.', generator: 'v0.app', icons: { icon: '/suleco-logo.webp' } }
export const viewport = { colorScheme: 'light' as const, themeColor: '#b0003a', userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={`bg-[#edf0f3] ${geistSans.variable} ${geistMono.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
