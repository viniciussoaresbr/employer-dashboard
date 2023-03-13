import React from 'react';
import { Icon } from '@chakra-ui/icons';

interface IPictureIcon {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
  cursor?: 'default' | 'pointer';
}

export const PictureIcon = ({
  width = '30px',
  height = '30px',
  fill = '#1479ff',
  onClick,
  cursor = 'pointer',
}: IPictureIcon) => (
  <Icon
    onClick={onClick}
    width={width}
    height={height}
    fill={fill}
    cursor={cursor}
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 32 32"
  >
    <g>
      <path d="M29,28H3c-0.552,0-1-0.447-1-1V13c0-0.552,0.448-1,1-1s1,0.448,1,1v13h24V10h-5c-0.266,0-0.52-0.105-0.707-0.293L18.586,6   h-5.172L9.707,9.707C9.52,9.895,9.265,10,9,10H3c-0.552,0-1-0.448-1-1s0.448-1,1-1h5.586l3.707-3.707C12.48,4.105,12.735,4,13,4h6   c0.266,0,0.52,0.105,0.707,0.293L23.414,8H29c0.553,0,1,0.448,1,1v18C30,27.553,29.553,28,29,28z" />
    </g>
    <g>
      <path d="M16,24c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S19.309,24,16,24z M16,14c-2.206,0-4,1.794-4,4c0,2.206,1.794,4,4,4   c2.206,0,4-1.794,4-4C20,15.794,18.206,14,16,14z" />
    </g>
  </Icon>
);
