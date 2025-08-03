import Link from "next/link"
import Image from "next/image";
import discord from "../public/discord.svg"
import instagram from "../public/instagram.svg"
import linkedin from "../public/linkedin.svg"
import email from "../public/email.svg"
import github from "../public/github.svg"

export default function Links() {
  return (
    < div className="grid grid-flow-col auto-cols-max gap-4" >
      <Link className="cursor-target" href={"https://discord.gg"} target="_blank">
        <Image src={discord} alt="Discord" />
      </Link>
      <Link className="cursor-target" href={"https://instagram.com"} target="_blank">
        <Image src={instagram} alt="Instagram" />
      </Link>
      <Link className="cursor-target" href={"https://discord.gg"} target="_blank">
        <Image src={linkedin} alt="Discord" />
      </Link>
      <Link className="cursor-target" href={"https://instagram.com"} target="_blank">
        <Image src={email} alt="Instagram" />
      </Link>
      <Link className="cursor-target" href={"https://github.com/nesetkab"} target="_blank">
        <Image src={github} alt="Github" />
      </Link>
    </div >
  );
}
