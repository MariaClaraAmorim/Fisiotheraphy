import { Header } from "@components/Header/header";

import "./globals.css"
interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-br">
      <head />
      <body>
          <Header />
          <div>{children}</div>
      </body>
    </html>
  );
}
