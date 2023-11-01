import type { Metadata } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './styles/Layout.module.css';
import HeaderPage from './header/page';
import FooterPage from './footer/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DJ events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, EDM, house',
};

export default function RootLayout({ title, keywords, description, children }: { title: string; keywords: string; description: string; children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="keywords"
          content={keywords}
        />
      </Head>
      <body className={inter.className}>
        <HeaderPage />
        <div className={styles.container}>{children}</div>
        <FooterPage />
      </body>
    </html>
  );
}
