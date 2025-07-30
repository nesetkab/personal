import Link from "next/link"
import discord from "../public/discord.svg"
import Image from "next/image";

export default function Links() {
  return (
    < div className="grid grid-flow-col auto-cols-max gap-4" >
      <Link href={"https://discord.gg"}
        target="_blank"
      >
        <Image src={discord}
          alt="discord" />
      </Link>
      <Link href={"https://discord.gg"}
        target="_blank"
      >
        <Image src={discord}
          alt="discord" />
      </Link>
      <Link href={"https://discord.gg"}
        target="_blank"
      >
        <Image src={discord}
          alt="discord" />
      </Link>
    </div >
  );
}
