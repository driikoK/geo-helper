'use client';

import React from 'react';
import {
  ButtonPreview,
  MenuWrapper,
  PageContainer,
  PageWrapper,
  Paragraph,
  ParagraphWrapper,
  PreviewWrapper,
  TextWrapper,
  Title,
} from './styles';
import { useMediaQuery } from '@mui/material';
import theme from '@/theme';
import { useRouter } from 'next/navigation';

import CalculateIcon from '@mui/icons-material/Calculate';
import TextRotationAngleupIcon from '@mui/icons-material/TextRotationAngleup';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import HikingIcon from '@mui/icons-material/Hiking';
import RoomIcon from '@mui/icons-material/Room';

export default function Home() {
  const router = useRouter();
  const isTablet = useMediaQuery(theme.screens.tablet);
  return (
    <PageContainer data-testid="home-page">
      <PageWrapper>
        <PreviewWrapper>
          <TextWrapper>
            <Title>Ваш помічник з геодезії!</Title>
            <Paragraph>
              Різні калькулятори з візуалізаєцію на реальній інтерактивній
              мапі.{' '}
            </Paragraph>
          </TextWrapper>
          <ParagraphWrapper>
            <Paragraph>
              Переходь до калькуляторів {isTablet ? '👉' : '👇'}{' '}
            </Paragraph>
          </ParagraphWrapper>
        </PreviewWrapper>
        <MenuWrapper>
          <ButtonPreview variant="contained" onClick={() => router.push('/convert')} startIcon={<CalculateIcon fontSize="large"/>}>Конвертор координат</ButtonPreview>
          <ButtonPreview variant="contained" onClick={() => router.push('/distance')} startIcon={<SocialDistanceIcon fontSize="large"/>}>Відстань між координатами</ButtonPreview>
          <ButtonPreview variant="contained" onClick={() => router.push('/azimuth')} startIcon={<TextRotationAngleupIcon fontSize="large"/>}>Азимут між координатами</ButtonPreview>
          <ButtonPreview variant="contained" onClick={() => router.push('/midpoint')} startIcon={<RoomIcon fontSize="large"/>}>Середня точка координат</ButtonPreview>
          <ButtonPreview variant="contained" onClick={() => router.push('/elevation')} startIcon={<HikingIcon fontSize="large"/>}>Визначення висоти</ButtonPreview>
        </MenuWrapper>
      </PageWrapper>
    </PageContainer>
  );
}
