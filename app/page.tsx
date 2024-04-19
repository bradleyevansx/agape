import ToLogin from "@/components/authState/ToLogin";
import NavBar from "@/components/navBar/NavBar";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex-1">
      <NavBar isLandingPage={true}></NavBar>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 min-h-app">
        <a
          target="_blank"
          href="https://www.merriam-webster.com/dictionary/agape"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          💒
          <div
            className="shrink-0 bg-border w-[1px] mx-2 h-4"
            aria-orientation="vertical"
          ></div>
          Agape
        </a>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Make marriage easy.
        </h1>
        <p className="max-w-[500px] mx-4 text-center text-md text-muted-foreground sm:text-xl">
          <b>Simplify</b> your life together with our practical approach to
          handling <b className="text-green-500">finances</b>, pursuing{" "}
          <b className="text-teal-500">goals</b>, and enjoying{" "}
          <b className="text-blue-500">meals</b>, and managing{" "}
          <b className="text-purple-500">time</b> as a couple. Let&apos;s make
          every moment count.
        </p>
      </section>
    </main>
  );
}
