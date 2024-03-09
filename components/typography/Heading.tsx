import React from "react";

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

const Heading: React.FC<TypographyProps> = ({ variant, children }) => {
  let className = "scroll-m-20 font-semibold tracking-tight";
  let Tag: keyof JSX.IntrinsicElements = "h1";

  switch (variant) {
    case "h1":
      className += " text-4xl lg:text-5xl font-extrabold";
      break;
    case "h2":
      className += " text-3xl first:mt-0";
      Tag = "h2";
      break;
    case "h3":
      className += " text-2xl";
      Tag = "h3";
      break;
    case "h4":
      className += " text-xl";
      Tag = "h4";
      break;
    default:
      className += " text-4xl lg:text-5xl font-extrabold";
  }

  return <Tag className={className}>{children}</Tag>;
};

export default Heading;
