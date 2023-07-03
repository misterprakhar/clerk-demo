"use client";

import SignInCard from "@/components/SignInCard";
import SignUpCard from "@/components/SignUpCard";
import { useState } from "react";

const Auth = () => {
	const [authMode, setAuthMode] = useState("sign-in");
	if (authMode === "sign-in") {
		return <SignInCard setAuthMode={setAuthMode} />;
	}
	return <SignUpCard setAuthMode={setAuthMode} />;
};

export default Auth;
