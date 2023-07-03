"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignUpCard = ({ setAuthMode }: { setAuthMode: (val: string) => void }) => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const router = useRouter();
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
		<Card className="max-w-md container grid gap-2 p-4">
			<CardHeader className="gap-y-4">
				<CardTitle className="text-3xl">{!pendingVerification ? "Sign Up" : "Enter Code"}</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				{!pendingVerification && (
					<>
						<form className="grid gap-6">
							<div className="grid gap-2 ">
								<label htmlFor="email">Email</label>
								<Input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
							</div>
							<div className="grid gap-2">
								<label htmlFor="password">Password</label>
								<Input onChange={(e) => setPassword(e.target.value)} id="email" name="email" type="password" />
							</div>
							<Button onClick={handleSubmit}>Sign Up</Button>
						</form>
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-[#b5b5c3]">Or continue with</span>
							</div>
						</div>
						<SignInOAuthButtons />
					</>
				)}
				{pendingVerification && (
					<>
						<form className="grid gap-6">
							<Input value={code} onChange={(e) => setCode(e.target.value)} />
							<Button onClick={onPressVerify}>Verify Email</Button>
						</form>
					</>
				)}
			</CardContent>
			<CardFooter className="gap-2">
				Already have an account?
				<Button
					// 	href="/sign-in"
					// 	className="font-bold hover:underline
					// underline-offset-4"
					onClick={() => setAuthMode("sign-inc")}
				>
					Sign In
				</Button>
			</CardFooter>
		</Card>
	);
};

export default SignUpCard;
