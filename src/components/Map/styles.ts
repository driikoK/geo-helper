import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const MapContainerStyled = styled(MapContainer)`
  height: 400px;
  ${({ theme }) =>
    theme.mq({
      width: ["100%", "100%", "60%", "60%"],
  })};
`