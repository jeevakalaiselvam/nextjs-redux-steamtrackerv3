import React from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/MenuItem";
import {
  HiViewGrid,
  HiAdjustments,
  HiRefresh,
  HiEye,
  HiChartBar,
} from "react-icons/hi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function GamesPageMenu() {
  return (
    <Container>
      <MenuItem to="/games" title="Games" icon={<HiViewGrid />} />
      <MenuItem to="/games" title="Ongoing" icon={<HiEye />} />
      <MenuItem to="/games" title="Planner" icon={<HiChartBar />} />
      <MenuItem to="/games" title="Settings" icon={<HiAdjustments />} />
    </Container>
  );
}
