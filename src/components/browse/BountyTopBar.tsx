import Link from "next/link";
import { Button } from "@/components/ui/button";
import AccountMenu from "@/components/browse/AccountMenu";

// Quest dashboard top bar — logo left, account on the right (plus an optional
// "Post a quest" CTA). Brand coral is reserved for the CTA.
export default function BountyTopBar({
  showPost = true,
}: {
  active?: string;
  showPost?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.08] bg-white">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-5 lg:px-8">
        {/* Logo (landing-page wordmark) */}
        <Link href="/prototype/bounties" aria-label="Quest" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/Logo.svg"
            alt="Quest"
            width={80}
            height={30}
            className="h-7 w-auto"
          />
        </Link>

        {/* Right: optional Post CTA + account */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {showPost && (
            <Button variant="primary" size="sm" className="h-9 px-4">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                add
              </span>
              <span className="hidden sm:inline">Post a quest</span>
            </Button>
          )}
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
