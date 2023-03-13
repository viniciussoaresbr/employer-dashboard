import React from 'react';
import { Icon } from '@chakra-ui/icons';

interface ILogoutIcon {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
  cursor?: 'default' | 'pointer';
}

export const LogoutIcon = ({
  width = '30px',
  height = '30px',
  fill = '#011627',
  onClick,
  cursor = 'default',
}: ILogoutIcon) => (
  <Icon
    height={height}
    width={width}
    viewBox="0 0 32 32"
    fill={fill}
    onClick={onClick}
    cursor={cursor}
  >
    <title />
    <g data-name="1" id="_1">
      <path
        d="M27,3V29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27H7v1H25V4H7V7H5V3A1,1,0,0,1,6,2H26A1,1,0,0,1,27,3ZM10.71,20.29,7.41,17H18V15H7.41l3.3-3.29L9.29,10.29l-5,5a1,1,0,0,0,0,1.42l5,5Z"
        id="logout_account_exit_door"
      />
    </g>
  </Icon>
);
