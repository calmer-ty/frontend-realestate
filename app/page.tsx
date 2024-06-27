import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div>
      <Link href="/test">test 페이지 이동</Link>
    </div>
  );
}
