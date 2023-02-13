export default function HeaderComponent({
  pageTitle,
  subTitle,
}: {
  pageTitle: string;
  subTitle: string;
}) {
  return (
    <header className="rounded-md bg-slate-400 p-4">
      <h1>{pageTitle}</h1>
      <h2>{subTitle}</h2>
    </header>
  );
}
