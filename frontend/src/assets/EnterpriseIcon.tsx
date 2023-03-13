import React from 'react';
import { Icon } from '@chakra-ui/icons';

interface IEnterpriseIcon {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
  cursor?: 'default' | 'pointer';
}

export const EnterpriseIcon = ({
  width = '30px',
  height = '30px',
  fill = '#fff',
  onClick,
  cursor = 'default',
}: IEnterpriseIcon) => (
  <Icon
    viewBox="0 0 32 32"
    width={width}
    height={height}
    fill={fill}
    onClick={onClick}
    cursor={cursor}
  >
    <rect height="4" width="2" x="8" y="8" />
    <rect height="4" width="2" x="8" y="14" />
    <rect height="4" width="2" x="14" y="8" />
    <rect height="4" width="2" x="14" y="14" />
    <rect height="4" width="2" x="8" y="20" />
    <rect height="4" width="2" x="14" y="20" />
    <path d="M30,14a2,2,0,0,0-2-2H22V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V30H30ZM4,4H20V28H4ZM22,28V14h6V28Z" />
  </Icon>
);
