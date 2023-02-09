import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-refe rence/file-conventions/head
      */}
      <head />
      <body className="bg-slate-100 py-5 px-10">{children}</body>
    </html>
  );
}
