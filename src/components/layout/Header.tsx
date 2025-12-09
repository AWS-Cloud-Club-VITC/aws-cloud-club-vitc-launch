import Link from "next/link";


export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-linear-to-br from-purple-500 to-blue-600 text-white font-bold">
                        A
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        AWS CLOUD CLUB <span className="text-primary">VIT-C</span>
                    </span>
                </Link>

                <div className="rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-white border border-white/10 backdrop-blur-sm">
                    Jan 06, 2026
                </div>
            </div>
        </header>
    );
}
