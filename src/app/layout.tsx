import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});


export const metadata: Metadata = {
    title: "StoryHub",
    description: "Next Level blog platform",
};

export default function RootLayout({
    children,
}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${inter.className} antialiased`}
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