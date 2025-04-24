import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["500", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Furia CSGO",
  description: "Um web chat que sabe tudo sobre o time de CS:GO da FURIA !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://furiagg.fbitsstatic.net/sf/img/favicon.ico?theme=main&v=202503171541
                "
          sizes="any"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
