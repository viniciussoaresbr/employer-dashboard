import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Box,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ProfileStyles } from './styles';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProfile {
  username: string;
  userMenuOptions: {
    icon?: React.ReactElement;
    label: string;
    onClick: () => void;
  }[];
}

export const UserProfile = ({ username, userMenuOptions }: IProfile) => {
  return (
    <Flex sx={ProfileStyles.profileContainer}>
      <Menu gutter={12}>
        <MenuButton sx={ProfileStyles.menuButton}>
          <Flex sx={ProfileStyles.profileWrapper}>
            <Avatar name={username} sx={ProfileStyles.avatar} />
            <VStack
              align="start"
              spacing={0}
              display={{ base: 'none', lg: 'flex' }}
            >
              <Text sx={ProfileStyles.username}>{username}</Text>
              <Text fontSize="xs" color="gray.500">
                Administrador
              </Text>
            </VStack>
            <ChevronDownIcon
              color="gray.500"
              display={{ base: 'none', lg: 'block' }}
              mx={2}
            />
          </Flex>
        </MenuButton>
        <MenuList
          borderRadius="lg"
          py={2}
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
        >
          <Box px={4} py={2} mb={1}>
            <Text fontWeight="600" fontSize="sm" color="gray.700">
              Minha Conta
            </Text>
          </Box>
          {userMenuOptions.map(({ icon, label, onClick }, index) => (
            <React.Fragment key={label}>
              {index === userMenuOptions.length - 1 && <MenuDivider />}
              <MenuItem
                icon={icon}
                onClick={onClick}
                fontSize="sm"
                fontWeight="500"
                color={
                  index === userMenuOptions.length - 1 ? 'blue.500' : 'gray.600'
                }
                py={2}
                px={4}
                _hover={{ bg: 'gray.50' }}
              >
                {label}
              </MenuItem>
            </React.Fragment>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};
