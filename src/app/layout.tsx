import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ClientOnlyProvider from "@/lib/client-only-provider";
import ReduxProvider from "@/redux/reduxProvider";

const poppins = Poppins({
  weight: ["200", "300", "400"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starsoft - frontend challenge",
  description: "Desafio frontend para a vaga de desenvolvedor na Starsoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ReduxProvider>
        <ClientOnlyProvider>
          <body className={`${poppins.className}`}>{children}</body>
        </ClientOnlyProvider>
      </ReduxProvider>
    </html>
  );
}
