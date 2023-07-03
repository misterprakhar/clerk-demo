"use client";

import { useClerk } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignOutButton = () => {
	const { signOut } = useClerk();
	return (
		<Button variant="outline" onClick={() => signOut()}>
			Sign out
		</Button>
	);
};

export default SignOutButton;
