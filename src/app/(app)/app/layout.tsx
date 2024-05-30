import BackGroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/types/pets";
import { Toaster } from "@/components/ui/sonner";
import prisma from "@/lib/db";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await prisma.pet.findMany();

  // Transform the data to match the Pet type
  const pets: Pet[] = data.map(
    (doc): Pet => ({
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
