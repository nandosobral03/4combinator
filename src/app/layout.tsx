import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import "@/styles/globals.css";
import { ValidBoard } from "./types/boards";

export const metadata = {
  title: "4combinator",
  description: "Imageboards made safe for work",
  referrer: "no-referrer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { board: ValidBoard };
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <main className="m-2 mx-auto max-w-6xl bg-[#f6f6ef]">
          <Header />
          <div className="flex-grow px-3">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
