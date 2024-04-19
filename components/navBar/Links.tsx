import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <>
      <Link
        href="/b/money"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Money
      </Link>
      {/* <Link
        href="#"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Food
      </Link> */}
      {/* <Link
        href="#"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Time
      </Link>
      <Link
        href="#"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Goals
      </Link> */}
      <p className="transition-colors hover:text-foreground/80 text-foreground/60">
        More coming soon.
      </p>
    </>
  );
};

export default Links;
