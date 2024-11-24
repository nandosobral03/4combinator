import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hacker News",
  description: "Hacker News Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-[Verdana]">
        <div className="mx-auto max-w-[120ch]">
          <div className="bg-[#f6f6ef] shadow-md">{children}</div>
        </div>
      </body>
    </html>
  );
}
