import { Stack } from "@chakra-ui/react";
import { FcGraduationCap } from "react-icons/fc";
import { RiBarChartFill, RiDashboardLine } from "react-icons/ri";

import { NavCategory } from "./NavCategory";
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

      <NavSection title="CATEGORIES">
        <NavCategory icon={FcGraduationCap}>Education</NavCategory>
      </NavSection>
    </Stack>
  );
}
