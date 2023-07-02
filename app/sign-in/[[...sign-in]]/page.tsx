"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

export default function SignInForm() {
	const { isLoaded, signIn, setActive } = useSignIn();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	function SignInOAuthButtons() {
		const { signIn } = useSignIn();

		const signInWith = (strategy: OAuthStrategy) => {
			return signIn?.authenticateWithRedirect({
				strategy,
				redirectUrl: "/sso-callback",
				redirectUrlComplete: "/",
			});
		};

		// Render a button for each supported OAuth provider
		// you want to add to your app
		return (
			<div>
				<button onClick={() => signInWith("oauth_google")}>GOOGLE</button>
			</div>
		);
	}
	// start the sign In process.
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		try {
			const result = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (result.status === "complete") {
				console.log(result);
				await setActive({ session: result.createdSessionId });
				router.push("/");
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result);
			}
		} catch (err: any) {
			console.error("error", err.errors[0].longMessage);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl underline underline-offset-4">SIGN IN</h1>
			<SignInOAuthButtons />
			<form>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => setEmailAddress(e.target.value)}
						id="email"
						name="email"
						type="email"
						className="text-black"
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						id="password"
						name="password"
						type="password"
						className="text-black"
					/>
				</div>
				<button onClick={handleSubmit}>Sign In</button>
			</form>
			<Link href="/sign-up" className="border border-white p-2 rounded-md">
				Sign Up
			</Link>
			<Link href="/" className="border border-white p-2 rounded-md">
				Home
			</Link>
		</div>
	);
}
