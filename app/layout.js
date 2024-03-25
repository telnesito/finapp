import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finapp",
  description: "Finapp - tu asistente financiero a la mano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" >
      <link rel="icon" href="/logoIcon.svg" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}