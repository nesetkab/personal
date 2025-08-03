"use client"

import TargetCursor from "../../components/TargetCursor";
import WarpText from "../../components/textBlob"
import Links from "../../components/Links";

export default function Home() {
  return (
    <div className="bg-black  flex-col items-center min-w-screen min-h-screen text-slate-200 font-sans selection:bg-purple-500/30" >

      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <main className='flex-col w-full flex items-center justify-center py-20 md:py-32'>
        <div className="w-full h-48">
          <WarpText />
        </div>

        <section className="w-full max-w-2xl px-6 py-12 text-center">
          <p className="cursor-target text-slate-400 leading-relaxed text-lg">
            this is bio text bla bla bla bla asdlfjalskdjfkl;asdj jklfnask;jvnbkjxcbnkvj;bkjsedafh askjdvbknx aksfjd cbxvkjxbvnjksdfbgjk; c bsdjk bkjxcvn </p>
        </section>
        <Links />
      </main>
    </div >
  );
}
