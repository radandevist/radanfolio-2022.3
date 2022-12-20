import Link from "next/link";

export default function HomePage() {
  return (
    <h1>Hello Dan! <Link href="/admin">Go to Admin page</Link></h1>
  );
}
