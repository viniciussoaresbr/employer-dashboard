import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ProfileStyles } from './styles';

interface IProfile {
  username: string;
  userMenuOptions: {
    icon: React.ReactElement;
    label: string;
    onClick: () => void;
  }[];
  employeesMenuOptions: {
    label: string;
    onClick: () => void;
  }[];
}

export const UserProfile = ({
  username,
  userMenuOptions,
  employeesMenuOptions,
}: IProfile) => {
  return (
    <Flex sx={ProfileStyles.profileContainer}>
      <Menu>
        <MenuButton sx={ProfileStyles.menuButton}>
          <Flex sx={ProfileStyles.profileWrapper}>
            <Avatar
              name={username}
              sx={ProfileStyles.avatar}
              borderRadius="50%"
            />
            <Text sx={ProfileStyles.username}>{username}</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Usuário">
            {userMenuOptions.map(({ icon, label, onClick }) => (
              <MenuItem key={label} icon={icon} onClick={onClick}>
                {label}
              </MenuItem>
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Funcionários">
            {employeesMenuOptions.map(({ label, onClick }) => (
              <MenuItem key={label} onClick={onClick}>
                {label}
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};
