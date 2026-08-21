import type { Metadata } from "next";
import { Playfair } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";



const playfair = Playfair({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Archive",
  description: "Next Level blog platform",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.className} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">

        <main className="w-full flex-1">

          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Toaster />
      </body>
    </html>
  );
}