import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import "@/styles/globals.css";
import { ValidBoard } from "./types/boards";

export const metadata = {
  title: "4combinator",
  description: "Imageboards made safe for work",
  referrer: "no-referrer",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { board: ValidBoard };
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col overflow-y-scroll">
        <main className="m-2 mx-auto w-full max-w-[72rem] bg-[#f6f6ef]">
          <Header />
          <div className="w-full max-w-[72rem] flex-grow px-3 py-4">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
