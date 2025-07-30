"use client"

import TargetCursor from "../../components/TargetCursor";
import WarpText from "../../components/textBlob"
export default function Home() {
  return (
    <div className="bg-black  flex flex-col items-center min-w-screen min-h-screen" >

      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <div className='w-full flex items-center justify-center'>
        <WarpText />

      </div>

    </div>



  );
}
