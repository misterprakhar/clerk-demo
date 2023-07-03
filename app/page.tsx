import SignOutButton from "@/components/SignOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
	const user = await currentUser();
	return (
		<main className="flex grow flex-col items-center justify-between p-24">
			<h1>This is the homepage</h1>
			{user ? (
				<SignOutButton />
			) : (
				<Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "ring-slate-500 p-3 rounded-md")}>
					Sign In
				</Link>
			)}
		</main>
	);
}
