import BackGroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/types/pets";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getPetsByUserId } from "@/utils/pet-db-queries";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const FoundedPets = await getPetsByUserId(data.user?.id);

  // Transform the data to match the Pet type.
  const pets: Pet[] = FoundedPets.map(
    (doc: Pet): Pet => ({
      id: doc.id,
      name: doc.name,
      ownerName: doc.ownerName,
      imageUrl: doc.imageUrl,
      age: doc.age,
      notes: doc.notes,
    })
  );
  return (
    <>
      <BackGroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <PetContextProvider data={pets}> {children}</PetContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
