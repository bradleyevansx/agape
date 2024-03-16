import React from "react";

interface TextProps {
  variant:
    | "p"
    | "blockquote"
    | "list"
    | "inlineCode"
    | "lead"
    | "large"
    | "small"
    | "muted";
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ variant, children }) => {
  let className = "";
  let Component: keyof JSX.IntrinsicElements = "p"; // Default to paragraph

  switch (variant) {
    case "p":
      className = "leading-7 [&:not(:first-child)]:mt-6";
      break;
    case "blockquote":
      className = "mt-6 border-l-2 pl-6 italic";
      Component = "blockquote";
      break;
    case "list":
      className = "my-6 ml-6 list-disc [&>li]:mt-2";
      Component = "ul";
      break;
    case "inlineCode":
      className =
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
      Component = "code";
      break;
    case "lead":
      className = "text-xl text-muted-foreground";
      break;
    case "large":
      className = "text-lg font-semibold";
      Component = "div";
      break;
    case "small":
      className = "text-sm font-medium leading-none";
      Component = "small";
      break;
    case "muted":
      className = "text-sm text-muted-foreground";
      break;
    default:
      className = "leading-7 [&:not(:first-child)]:mt-6";
  }

  return React.createElement(Component, { className }, children);
};

export default Text;
