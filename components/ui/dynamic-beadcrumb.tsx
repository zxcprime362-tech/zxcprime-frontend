"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split URL into segments
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    // Format label (optional beautify)
    const label = formatLabel(segment);

    return { label, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="p-0.5">
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Optional: Beautify segment text
function formatLabel(segment: string) {
  return segment
    .replace(/[-_]/g, " ") // replace - and _ with space
    .toLowerCase() // make everything lowercase first
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
}
