import { Tooltip, tooltipClasses } from "@mui/material";
import React from "react";
import styledC from "styled-components";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToolTipComponent from "./ToolTipComponent";
import AchievementCard from "./AchievementCard";
import AchievementCardTooltip from "./AchievementCardTooltip";

const Container = styledC.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  margin: 0.5rem;
  position: relative;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

const IconContainer = styledC.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background: url(${(props) => props.icon || ""});
  width: 60px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Overlay = styledC.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(0,0,0,0.5)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: "1.25rem",
    color: "#b0bec5",
    fontFamily: "PT Sans",
  },
}));

export default function AchievementIcon({ achievement }) {
  const { icon, id } = achievement;
  return (
    <BootstrapTooltip
      title={<AchievementCardTooltip achievement={achievement} />}
    >
      <Container>
        <Overlay />
        <IconContainer icon={icon}></IconContainer>
      </Container>
    </BootstrapTooltip>
  );
}
