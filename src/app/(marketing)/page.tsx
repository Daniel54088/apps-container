import { redirect } from "next/navigation";

export default function Home() {
  redirect("/ticketpilot/dashboard");
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10"></main>
  );
}
