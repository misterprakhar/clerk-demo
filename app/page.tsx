import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>This is the homepage</h1>
			<Link href="/sign-in" className="border border-white p-2 rounded-md">
				Sign In
			</Link>
		</main>
	);
}
