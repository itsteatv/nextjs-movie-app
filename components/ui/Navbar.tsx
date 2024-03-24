"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  console.log(session ? "signed in" : "not signed in");

  const menuItems = session
    ? ["Home", "TV", "Movies", "My List"]
    : ["Home", "TV", "Movies", "Sign In", "Sign Up"];

  return (
    <NextUINavbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className="font-SourceCodePro"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tv">
            TV
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/movies">
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/mylist">
            My List
          </Link>
        </NavbarItem>
      </NavbarContent>
      {!session ? (
        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <Link href="/signin">Sign In</Link>
          </NavbarItem>
          <NavbarItem>
            <Button href="/signup" as={Link} color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarItem>
          <Button
            onClick={() => signOut()}
            as={Link}
            color="danger"
            className="text-white hidden sm:flex"
            variant="ghost"
          >
            Sign Out
          </Button>
        </NavbarItem>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarItem key={item}>
            <Link
              color={
                index === 2
                  ? "danger"
                  : index === menuItems.length - 1
                  ? "primary"
                  : "foreground"
              }
              className="w-full"
              size="lg"
              href={`/${item.toLowerCase().split(" ").join("")}`}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
        {session && (
          <NavbarItem>
            <div
              onClick={() => signOut()}
              className="text-white cursor-pointer"
            >
              Sign Out
            </div>
          </NavbarItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Header;
