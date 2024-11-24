import Header from "@/app/_components/Header";
import ThreadItem from "@/app/_components/ThreadItem";
import type { Thread } from "@/app/types";
import { api } from "@/trpc/server";
import { type FC } from "react";

const exampleThreads: Thread[] = [
  {
    no: 1234567,
    sub: "archlinux.org",
    com: "Post your current desktop setup. Here's mine: Running Arch Linux with i3-gaps, polybar, and some custom scripts.",
    time: 1699123200,
    replies: 45,
    images: 23,
    points: 156,
    by: "techuser",
  },
  {
    no: 1234568,
    com: "What programming language should I learn first? Been interested in getting into software development.",
    time: 1699122300,
    replies: 67,
    images: 2,
    points: 10,
    by: "learner",
  },
  {
    no: 1234569,
    sub: "Mechanical keyboard thread",
    com: "Show off your mechanical keyboards. Just got my first custom build with Gateron Browns and PBT keycaps.",
    time: 1699121400,
    replies: 89,
    images: 56,
    points: 200,
    by: "keyboard_enthusiast",
  },
  {
    no: 1234570,
    com: "Anyone else using Firefox? What extensions do you recommend for privacy and productivity?",
    time: 1699120500,
    replies: 34,
    images: 3,
    points: 50,
    by: "privacy_seeker",
  },
  {
    no: 1234571,
    sub: "ThinkPad appreciation",
    com: "Just picked up a used T480. These machines are built like tanks. What's your ThinkPad story?",
    time: 1699119600,
    replies: 78,
    images: 15,
    points: 120,
    by: "thinkpad_lover",
  },
];

const Home: FC = async () => {
  // TODO: Replace with actual API call to fetch /g/ threads
  const threads: Thread[] = await api.catalog.getCatalogForBoard({
    board: "g",
    page: 1,
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6f6ef]">
        <div className="mx-2 max-w-6xl py-1">
          {threads.map((thread, index) => (
            <ThreadItem key={thread.no} thread={thread} index={index + 1} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
