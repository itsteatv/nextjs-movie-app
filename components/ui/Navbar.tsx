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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "TV", "Movies", "My List"];

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
          <Link aria-current="page">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">TV</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">Movies</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">My List</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/signin">Sign In</Link>
        </NavbarItem>
        <NavbarItem>
          <Button href="/signup" as={Link} color="primary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
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