import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-border-thick border-primary-container bg-surface-container-lowest py-8 px-margin">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-mono text-on-surface-variant">
        <p className="uppercase">
          &copy; {new Date().getFullYear()} AWS CLOUD CLUB VIT CHENNAI. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 items-center">
          <Link href="/events" className="hover:text-primary-container uppercase transition-colors">
            FRONTIER Event
          </Link>
          <Link href="/joinus" className="hover:text-primary-container uppercase transition-colors">
            Join Club
          </Link>
          <a
            href="https://www.instagram.com/awsvitc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-container font-bold hover:underline uppercase"
          >
            @awsvitc
          </a>
        </div>
      </div>
    </footer>
  );
}
