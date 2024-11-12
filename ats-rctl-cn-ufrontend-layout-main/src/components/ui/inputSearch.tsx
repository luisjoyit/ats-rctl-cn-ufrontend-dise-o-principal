import { IconSearch } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { Input } from "./input";

interface InputSearchProps {
  placeholder?: string;
  className?: string;
}

export default function InputSearch({
  placeholder = "",
  className,
}: InputSearchProps) {
  return (
    <div className={cn("relative min-w-10 lg:w-[27rem]", className)}>
      <IconSearch
        stroke={1.5}
        className="absolute top-0 bottom-0 w-4 h-4 my-auto ml-4 antialiased text-secondary-500 dark:text-secondary-foreground"
      />
      <Input
        type="text"
        className="px-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent hidden sm:block"
        placeholder={placeholder}
      />
    </div>
  );
}
