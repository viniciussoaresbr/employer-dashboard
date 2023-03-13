import React from 'react';
import { GithubIcon } from '../../assets/GithubIcon';
import { LinkedinIcon } from '../../assets/LinkedinIcon';
import { FooterStyles } from './styles';
import { Flex, Link } from '@chakra-ui/react';

interface IFooter {
  githubUrl?: string;
  linkedinUrl?: string;
}

export const Footer = ({
  githubUrl = 'https://github.com/viniciussoaresbr',
  linkedinUrl = 'https://www.linkedin.com/in/vinicius-soares-57164b214/',
}: IFooter) => {
  return (
    <Flex as="footer" sx={FooterStyles.footer}>
      <Link href={githubUrl} isExternal>
        <GithubIcon width="40px" height="40px" cursor="pointer" />
      </Link>
      <Link href={linkedinUrl} isExternal>
        <LinkedinIcon width="38px" height="38px" cursor="pointer" />
      </Link>
    </Flex>
  );
};
