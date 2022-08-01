import React from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/MenuItem";
import {
  HiViewGrid,
  HiAdjustments,
  HiArrowsExpand,
  HiEye,
  HiChartBar,
} from "react-icons/hi";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`;

const MenuItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`;

export default function GamesPageMenu() {
  return (
    <Container>
      <MenuItemContainer>
        <MenuItem to="/games" title="Games" icon={<HiViewGrid />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/games" title="Ongoing" icon={<HiEye />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/games" title="Planner" icon={<HiChartBar />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/games" title="Settings" icon={<HiAdjustments />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/" title="Refresh" icon={<HiArrowsExpand />} />
      </MenuItemContainer>
    </Container>
  );
}
