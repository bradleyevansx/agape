import React, { ReactNode } from "react";

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
  let Component = ({ children }: { children: ReactNode }) => <p>{children}</p>; // Default to paragraph

  switch (variant) {
    case "p":
      className = "leading-7 [&:not(:first-child)]:mt-6";
      Component = ({ children }) => <p className={className}>{children}</p>;
      break;
    case "blockquote":
      className = "mt-6 border-l-2 pl-6 italic";
      Component = ({ children }) => (
        <blockquote className={className}>{children}</blockquote>
      );
      break;
    case "list":
      className = "my-6 ml-6 list-disc [&>li]:mt-2";
      Component = ({ children }) => <ul className={className}>{children}</ul>;
      break;
    case "inlineCode":
      className =
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
      Component = ({ children }) => (
        <code className={className}>{children}</code>
      );
      break;
    case "lead":
      className = "text-xl text-muted-foreground";
      Component = ({ children }) => <p className={className}>{children}</p>;
      break;
    case "large":
      className = "text-lg font-semibold";
      Component = ({ children }) => <div className={className}>{children}</div>;
      break;
    case "small":
      className = "text-sm font-medium leading-none";
      Component = ({ children }) => (
        <small className={className}>{children}</small>
      );
      break;
    case "muted":
      className = "text-sm text-muted-foreground";
      Component = ({ children }) => <p className={className}>{children}</p>;
      break;
    default:
      className = "leading-7 [&:not(:first-child)]:mt-6";
      Component = ({ children }) => <p className={className}>{children}</p>;
  }

  return <Component>{children}</Component>;
};

export default Text;
