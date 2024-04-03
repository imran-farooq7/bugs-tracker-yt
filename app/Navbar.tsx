"use client";
import {
	Avatar,
	Box,
	Button,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugBeetleFill } from "react-icons/pi";

const Navbar = () => {
	const path = usePathname();
	const { status, data: session } = useSession();
	return (
		<nav className="flex space-x-6 border-b px-5 h-14 items-center justify-between">
			<Flex gap={"4"}>
				<Link href={"/"}>
					<PiBugBeetleFill className="text-2xl" />
				</Link>
				<ul>
					<li>
						<Link
							href={"/issues"}
							className={`${
								path === "/issues" ? "text-zinc-900" : "text-zinc-500"
							}`}
						>
							Issues
						</Link>
					</li>
				</ul>
			</Flex>
			<Box>
				{status === "authenticated" && (
					<DropdownMenu.Root>
						<DropdownMenu.Trigger className="cursor-pointer *:">
							<Avatar
								src={session.user?.image!}
								fallback="?"
								size={"3"}
								radius="full"
							/>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content className="p-3">
							<Text mb={"3"}>{session.user?.email}</Text>
							<Button onClick={() => signOut()}>Logout</Button>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				)}
				{status === "unauthenticated" && (
					<div onClick={() => signIn()}>Log in</div>
				)}
			</Box>
		</nav>
	);
};
export default Navbar;
