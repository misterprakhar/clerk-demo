import { UserButton } from "@clerk/nextjs";
import { ThemeModeButton } from "./ThemeModeButton";

export const Header = () => {
	return (
		<div className="flex justify-between p-8">
			<UserButton afterSignOutUrl="/" />
			<ThemeModeButton />
		</div>
	);
};
