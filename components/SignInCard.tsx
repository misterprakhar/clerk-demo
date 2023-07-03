"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignInCard = ({ setAuthMode }: { setAuthMode: (val: string) => void }) => {
	const { isLoaded, signIn, setActive } = useSignIn();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

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
		<Card className="max-w-md container grid gap-2 p-4">
			<CardHeader className="gap-y-4">
				<CardTitle className="text-3xl">Sign In</CardTitle>
			</CardHeader>
			<CardContent className="grid">
				<form className="grid gap-6">
					<div className="grid gap-2 ">
						<label htmlFor="email">Email</label>
						<Input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email"></Input>
					</div>
					<div className="grid gap-2">
						<label htmlFor="password">Password</label>
						<Input onChange={(e) => setPassword(e.target.value)} id="email" name="email" type="password"></Input>
					</div>
					<Button onClick={handleSubmit}>Sign In</Button>
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
			</CardContent>
			<CardFooter className="gap-2">
				Don&apos;t have an account?
				<Button
					// href="/sign-up"
					// 	className="font-bold hover:underline
					// underline-offset-4"
					onClick={() => setAuthMode("sign-up")}
				>
					Sign Up
				</Button>
			</CardFooter>
		</Card>
	);
};

export default SignInCard;
