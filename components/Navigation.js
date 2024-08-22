"use client";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';

import { Navbar } from "flowbite-react";
import Link from "next/link";

export default function Navigation() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="/">
                {/* <img src="/vercel.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Vault</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link as={Link} href="/">
                    Home
                </Navbar.Link>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <Navbar.Link as={Link} href="/create">
                        Add Password
                    </Navbar.Link>
                    <Navbar.Link as={Link} href="/demo">
                        Add Password (demo)
                    </Navbar.Link>
                    <UserButton />
                </SignedIn>
            </Navbar.Collapse>
        </Navbar>
    )
}
