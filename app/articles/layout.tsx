import { ReactNode } from "react";
import Search from "../ui/Search";
import Combo from "../ui/Combobox";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <Search /> */}
      {children}
    </div>
  );
}
