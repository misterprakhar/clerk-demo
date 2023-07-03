"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

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
		<div className="flex justify-center">
			<Button variant="outline" onClick={() => signInWith("oauth_google")}>
				<FaGoogle className="mr-4" /> Google
			</Button>
		</div>
	);
}

export default SignInOAuthButtons;
