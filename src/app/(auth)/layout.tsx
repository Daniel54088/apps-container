import Logo from "@/components/logo";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-y justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
