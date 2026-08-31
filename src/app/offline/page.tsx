import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <section className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
      <div className="flex flex-col items-center gap-6 md:gap-8 text-center max-w-lg">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-zinc-800 text-zinc-400">
          <WifiOff className="w-8 h-8 md:w-10 md:h-10" aria-hidden />
        </div>
        <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
          You&apos;re offline
        </h1>
        <p className="text-zinc-100 text-base md:text-lg font-normal leading-relaxed">
          This page isn&apos;t available without a connection. Check your network and try again.
        </p>
        <Link
          href="/"
          className="mt-2 inline-block bg-[#C7AE7F] text-zinc-900 font-normal text-base uppercase tracking-[1.5px] px-8 py-4 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7AE7F] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        >
          Go to home
        </Link>
      </div>
    </section>
  );
}
