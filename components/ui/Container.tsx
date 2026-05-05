import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto px-5 sm:px-6 lg:px-8",
        {
          "max-w-3xl": size === "narrow",
          "max-w-7xl": size === "default",
          "max-w-[1440px]": size === "wide",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
