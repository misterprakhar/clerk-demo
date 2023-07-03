"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { RxSun, RxMoon } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeModeButton() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					className="bg-transparent hover:bg-[rgba(0,0,0,0.1)] dark:bg-transparent dark:hover:bg-[rgba(100,100,100,0.3)]"
				>
					<RxSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black" />
					<RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all  dark:rotate-0 dark:scale-100 text-white" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
