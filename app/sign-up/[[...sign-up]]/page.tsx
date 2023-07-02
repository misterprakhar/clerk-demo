"use client";
import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

export default function SignUpForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
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
	// start the sign up process.
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// change the UI to our pending section.
			setPendingVerification(true);
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	// This verifies the user using email code that is delivered.
	const onPressVerify = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});
			if (completeSignUp.status !== "complete") {
				/*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
				console.log(JSON.stringify(completeSignUp, null, 2));
			}
			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId });
				router.push("/");
			}
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl underline underline-offset-4">SIGN UP</h1>
			<SignInOAuthButtons />
			{!pendingVerification && (
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
					<button onClick={handleSubmit}>Sign up</button>
				</form>
			)}
			{pendingVerification && (
				<div>
					<form>
						<input
							value={code}
							placeholder="Code..."
							onChange={(e) => setCode(e.target.value)}
							className="text-black"
						/>
						<button onClick={onPressVerify}>Verify Email</button>
					</form>
				</div>
			)}
			<Link href="/sign-in" className="border border-white p-2 rounded-md">
				Sign In
			</Link>
			<Link href="/" className="border border-white p-2 rounded-md">
				Home
			</Link>
		</div>
	);
}
