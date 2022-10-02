import { Stack } from "@chakra-ui/react";
import {
  RiBarChartFill,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/graphics" icon={RiBarChartFill}>
          Graphics
        </NavLink>
      </NavSection>
    </Stack>
  );
}
