import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  RiAccountCircleFill,
  RiArrowDownSLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Menu>
        <MenuButton>
          <Box style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Avatar size="md" name={user.name} src={user.pictureUrl} />
            <RiArrowDownSLine fontSize="24" />
          </Box>
        </MenuButton>

        <MenuList bgColor="pink.900">
          <MenuGroup title="Profile">
            <MenuItem
              icon={<RiAccountCircleFill />}
              _focus={{
                backgroundColor: "pink.700",
              }}
            >
              {user.name}
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            onClick={signOut}
            icon={<RiLogoutBoxRLine />}
            _focus={{
              backgroundColor: "pink.700",
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
