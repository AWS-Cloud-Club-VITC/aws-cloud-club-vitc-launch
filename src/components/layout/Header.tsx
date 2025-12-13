import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/aws_logo.png"
              alt="AWS Cloud Clubs VIT Chennai"
              width={56}
              height={56}
              className="h-20 w-20 rounded-lg object-cover shadow-lg"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs sm:text-lg font-bold tracking-tight text-white">
              AWS CLOUD CLUB <span className="text-primary">VIT-C</span>
            </span>
          </div>
        </Link>

        <div className="rounded-full bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-white border border-white/10 backdrop-blur-sm">
          Jan 06, 2026
        </div>
      </div>
    </header>
  );
}
