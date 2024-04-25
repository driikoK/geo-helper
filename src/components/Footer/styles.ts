import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray};
  ${({ theme }) =>
    theme.mq({
      padding: ["16px", "16px", "16px 80px", "16px 80px"],
  })};
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

export const Paragraph = styled.span`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: white;
  font-weight: bold;
  font-size: 15px;
`;