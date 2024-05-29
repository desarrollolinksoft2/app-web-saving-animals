import { Roboto } from 'next/font/google'
import './globals.css'
import ThemeProviderMui from '@/components/tools/theme_provider_mui'

/*
Noto_Sans
*/

const fontBody = Roboto({
  weight: ['300', '400', '500'],
  styles: ["italic", "normal"],
  subsets: ['latin'],
  variable: '--font-body'
})

export const metadata = {
  title: 'S7 App',
  description: 'Created by Centrix',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`o_web_client ${fontBody.className}`}>
        <ThemeProviderMui>
          {children}
        </ThemeProviderMui>
      </body>
    </html>
  )
}
