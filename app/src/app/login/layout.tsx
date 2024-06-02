import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '../globals.css';
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: "Login | Erdem Bektas",
  description: "Erdem Bektas Todo App",
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
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
