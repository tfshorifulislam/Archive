import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    display: "swap",
});

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
            className={`${inter.className} ${merriweather.className} antialiased`}
        >
            <body className="min-h-screen w-full bg-background font-sans">
                <main className="w-full">
                    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>

                <Toaster />
            </body>
        </html>
    );
}