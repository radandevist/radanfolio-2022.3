import Link from "next/link";

export default function HomePage() {
  return (
    <h1>Hello Dan! <Link className="bg-yellow-500" href="/admin">Go to Admin page</Link></h1>
  );
}
