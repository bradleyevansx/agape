import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const BreadCrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const renderHomeBreadcrumb = pathNames.length > 1;
  const filteredPathNames = pathNames.filter(
    (path) => path !== "a" && path !== "b" && path.length <= 15
  );

  if (!renderHomeBreadcrumb) return null;

  return (
    <span
      style={{ position: "fixed", bottom: "0", left: "0", padding: "10px" }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {pathNames.includes("b") && (
            <BreadcrumbItem>
              <BreadcrumbLink href="/b">Home</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {filteredPathNames.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path}`}>
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </span>
  );
};

export default BreadCrumbs;
