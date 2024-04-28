import Button from '@/components/Button';
import { buttonClasses } from '@mui/material';
import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const PageWrapper = styled.div`
  flex: 1;
  display: flex;
  ${({ theme }) =>
    theme.mq({
      padding: ['16px', '16px', '40px 80px', '40px 80px'],
      flexDirection: ['column', 'column', 'row', 'row'],
    })};
  gap: 30px;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) =>
    theme.mq({
      width: ['100%', '100%', '60%', '60%'],
      padding: ['30px 16px', '30px 16px', '50px 40px', '50px 40px'],
      minHeight: ['300px', '300px', '400px', '400px'],
    })};
  background-image: url(/background.jpg);
  background-size: cover;
  border-radius: 18px;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  ${({ theme }) =>
    theme.mq({
      width: ['90%', '90%', '60%', '60%'],
    })};
`;

export const MenuWrapper = styled.div`
  display: grid;
  /* flex-wrap: wrap; */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  gap: 16px 12px;
  ${({ theme }) =>
    theme.mq({
      width: ['100%', '100%', '40%', '40%'],
    })};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: white;
  font-weight: 600;
  ${({ theme }) =>
    theme.mq({
      fontSize: ['20px', '20px', '30px', '30px'],
    })};
`;

export const Paragraph = styled.span`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: white;
  font-weight: 500;
  ${({ theme }) =>
    theme.mq({
      fontSize: ['17px', '17px', '20px', '20px'],
    })};
`;

export const ParagraphWrapper = styled.div`
  ${({ theme }) =>
    theme.mq({
      padding: ['8px', '8px', '16px', '16px'],
    })};
  background-color: ${({ theme }) => theme.colors.babyBlue};
  border-radius: 8px;
  width: fit-content;
  cursor: pointer;
  transition: all 0.7s ease-out;
  &:active {
    filter: brightness(0%);
  }
`;

export const ButtonPreview = styled(Button)`
  && {
    /* height: fit-content; */
    min-height: 85px;
    width: 100%;
    font-weight: 500;

    ${({ theme }) =>
      theme.mq({
        fontSize: ['18px', '18px', '20px', '20px'],
      })};
  .${buttonClasses.startIcon}{
    svg{
      height: 40px;
      width: 40px;
    }
}}
`;
