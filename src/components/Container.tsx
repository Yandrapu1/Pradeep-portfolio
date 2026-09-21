import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={`max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 mx-auto ${className}`}
    >
      {children}
    </Component>
  );
}
