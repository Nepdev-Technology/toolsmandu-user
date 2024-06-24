import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProgressBar from '../components/ProgressBar';
import '../styles/globals.css';
import { theme } from '../theme';
// import { GoogleAnalyticsTracking } from '../components/Google/GoogleAnalyticsTracking';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toolsmandu.com - Digital Doctor For Your Business',
  description: 'Digital Doctor For Your Business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/toolsmandu-favicon-1.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="all" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* <GoogleAnalyticsTracking></GoogleAnalyticsTracking> */}
        {/* <GoogleAnalytics gaId="G-XYZ" /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NWTH8QHW');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-primary`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWTH8QHW"
              height="0" width="0" style="display:none;visibility:hidden">
            `,
          }}
        />{' '}
        <ProgressBar></ProgressBar>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
