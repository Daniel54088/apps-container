import BackGroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/types/pets";
import { FindOptions, Document } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { Toaster } from "@/components/ui/sonner";
import { connectToDatabase } from "@/lib/mongodb";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const petsCollection = await getCollection("pets");
  const options: FindOptions<Document> = { projection: { _id: 0 } };
  if (!petsCollection) return;
  const data = await petsCollection.find({}, options).toArray();

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
  console.log(petsCollection);
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
