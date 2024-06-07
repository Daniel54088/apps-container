import { getUserAuthData } from "@/utils/supabase/get-supabase-auth";
import SignOutButton from "@/components/sign-out-button";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

export default async function Account() {
  const data = await getUserAuthData();
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex flex-col justify-center items-center gap-3 ">
        <div>Logged in as {data?.user?.email}</div>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
