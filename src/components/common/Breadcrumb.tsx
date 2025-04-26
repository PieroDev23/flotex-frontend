
import { Breadcrumb } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";



export type BreadcrumbItem = {
  parent: BreadcrumbItem | undefined,
  name: string;
  url: string;
}


export const CustomBreadcrumb: React.FC = () => {
  const segments = new URL(window.location.href)
    .pathname
    .split("/")
    .slice(1);

  const paths = segments.map((segment, idx) => {
    const url = `/${segments.slice(0, idx + 1).join("/")}`
    return { name: segment, url };
  });

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List justifyContent="center">
        {[{ name: "home", url: "/" }, ...paths.map(i => {
          if (i.name === "order") return { ...i, url: "" }
          return { ...i };
        })].map(e => (
          <Breadcrumb.Item
            fontSize={15}
            key={e.url}
            gap={2}
            _notLast={{
              _after: { content: "'>'" },
              fontWeight: "semibold"
            }}
          >
            <Breadcrumb.Link asChild textTransform="capitalize" gap={2} color="black">
              <Link to={e.url}>
                {e.name}
              </Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
