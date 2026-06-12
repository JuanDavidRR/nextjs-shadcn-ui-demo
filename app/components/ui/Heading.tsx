import { ReactNode, ComponentPropsWithoutRef } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps<
  T extends HeadingLevel = "h1",
> extends ComponentPropsWithoutRef<"div"> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export default function Heading<T extends HeadingLevel = "h1">({
  as,
  children,
  className = "",
  ...props
}: HeadingProps<T>) {
  const Component = as || "h1";

  const baseStyles: Record<HeadingLevel, string> = {
    h1: "text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl",
    h2: "text-3xl font-bold tracking-tight text-gray-900",
    h3: "text-2xl font-semibold text-gray-900",
    h4: "text-xl font-medium text-gray-900",
  };

  const combinedClasses =
    `${baseStyles[Component as HeadingLevel]} ${className}`.trim();

  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
}
