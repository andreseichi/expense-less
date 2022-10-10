import {
  RiAddFill,
  RiBook2Fill,
  RiCarFill,
  RiFridgeFill,
  RiGamepadFill,
  RiGiftFill,
  RiHome8Fill,
  RiHospitalFill,
  RiMovie2Fill,
  RiShoppingCartFill,
  RiTeamFill,
} from "react-icons/ri";
import { IconType } from "react-icons";

interface CategoryIcon {
  [key: string]: IconType;
}

export const categoryIcon: CategoryIcon = {
  Education: RiBook2Fill,
  Family: RiTeamFill,
  Transport: RiCarFill,
  Market: RiShoppingCartFill,
  Gift: RiGiftFill,
  Food: RiFridgeFill,
  Home: RiHome8Fill,
  Entertainment: RiMovie2Fill,
  Health: RiHospitalFill,
  "Video Game": RiGamepadFill,
  Other: RiAddFill,
};
