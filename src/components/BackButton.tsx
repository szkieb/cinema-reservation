import Link from "next/link";

export default function BackButton({ className }: { className: string }) {
  return (
    <Link href={"/"} className={className}>
      <button className="h-full w-full">Back To Cinema Selection</button>
    </Link>
  );
}
