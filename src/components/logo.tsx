import Image from "next/image";
// import logo from "../../public/ticket-logo.svg";
import logo from "../../public/icons8-logo-33.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Ticket Pilot logo" />
    </Link>
  );
}
