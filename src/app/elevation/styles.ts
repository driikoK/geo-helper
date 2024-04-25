import styled from "styled-components";

export const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const PageWrapper = styled.div`
  display: flex;
  ${({ theme }) =>
    theme.mq({
      padding: ["16px", "16px", "40px 80px", "40px 80px"],
      flexDirection: ["column", "column", "row", "row"]
  })};
  gap: 30px;
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 16px;
  border-radius: 16px;
  ${({ theme }) =>
    theme.mq({
      width: ["100%", "100%", "40%", "40%"],
  })};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: black;
  font-weight: 500;
  font-size: 20px;
`;

export const Underline = styled.span`
  text-decoration: green wavy underline;;
`;

export const Paragraph = styled.span`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  font-size: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 30px;

  height: 400px;
  ${({ theme }) =>
    theme.mq({
      width: ["100%", "100%", "60%", "60%"],
  })};
`