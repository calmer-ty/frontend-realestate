import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div>
      <Link href="/view">view 페이지 이동</Link>
      <Link href="/test">write 페이지 이동</Link>
    </div>
  );
}
