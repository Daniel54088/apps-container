import SignOutButton from "@/components/sign-out-button";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { checkAuth } from "@/utils/check-auth";

export default async function Account() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex flex-col justify-center items-center gap-3 ">
        <div>Logged in as {session?.user?.email}</div>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
