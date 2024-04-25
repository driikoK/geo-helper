'use client';

import { FunctionComponent, useState } from 'react';
import {
  FooterContainer,
  LogoWrapper,
  Paragraph,
} from './styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useRouter } from 'next/navigation';

const Footer: FunctionComponent = () => {
  const router = useRouter();
  const year = new Date().getFullYear();
  const handleLink = (link: string) => {
    router.push(link);
  };

  return (
    <FooterContainer>
      <LogoWrapper onClick={() => handleLink('/')}>
        <TravelExploreIcon color="secondary" fontSize="medium" />
        <Paragraph>Geo-Helper ({year})</Paragraph>
      </LogoWrapper>
    </FooterContainer>
  );
};

export default Footer;
