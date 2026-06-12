import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type Lang = { language_code: string; native_name: string };
type Translation = { uri: string; language: Lang };

// Simple link = no children. Group = has children.
type SimpleLink = { title: string; href: string };
type Group = { title: string; children: SimpleLink[] };
type NavItem = SimpleLink | Group;

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Pages",
    children: [
      { title: "MVNO/MVNE", href: "/mvno-mvne" },
      { title: "Leadership", href: "/our-leadership-team/" },
    ],
  },
  {
    title: "Resources",
    children: [
      { title: "Blog", href: "/blog" },
      { title: "Events", href: "/events" },
    ],
  },
];

function isGroup(item: NavItem): item is Group {
  return "children" in item;
}

export default function Header({
  current,
  currentUri,
  translations,
}: {
  current?: Lang;
  currentUri?: string;
  translations?: Translation[];
}) {
  return (
    <header className="bg-white w-full mx-auto p-6 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold">
            BICS
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) =>
              isGroup(item) ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-[220px]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className="block rounded-md p-2 hover:bg-gray-100 transition"
                            >
                              {child.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
