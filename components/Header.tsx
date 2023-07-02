import { UserButton } from "@clerk/nextjs";

export const Header = () => {
	return (
		<div>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};
