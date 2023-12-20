"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge
} from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { ProductContext } from "@/contexts/ProductContext";

const links = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Sobre", href: "/sobre" },
];

export default function Header() {
  const pathname = usePathname();
  const numProducts = useContext(ProductContext);
  console.log(pathname);

  return (
    <Navbar position="static" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((item, index) => (
          <NavbarItem key={index} isActive={item.href === pathname}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <Badge color="primary" content={numProducts} shape='circle'>
        <BsCart3 className='fill-current' size={30}/>
      </Badge>
    </Navbar>
  );
}