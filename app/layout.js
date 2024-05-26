import { Popins } from "./utils/fuentes";
import "./globals.css";

export const metadata = {
  title: "Finapp",
  description: "Finapp - tu asistente financiero a la mano",
  manifest: "/manifest.json",

};

export default function RootLayout({ children }) {
  return (
    <html lang="es" >
      <link rel="icon" href="/logoIcon.svg" sizes="any" />
      <body className={Popins.className}>{children}
      </body>
    </html>
  );
}
