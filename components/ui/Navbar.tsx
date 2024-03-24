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

  const menuItems = ["Home", "TV", "Movies", "My List"];

  const { data: session } = useSession();

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
          <Link href="/">
            Home
          </Link>
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
        <NavbarContent justify="end">
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
            className="text-white"
            variant="ghost"
          >
            Sign Out
          </Button>
        </NavbarItem>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            className="font-SourceCodePro"
            key={`${item}-${index}`}
          >
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Header;
