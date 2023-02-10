import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/MenuItem";
import {
  HiViewGrid,
  HiAdjustments,
  HiArrowsExpand,
  HiEye,
  HiChartBar,
  HiOutlineHome,
  HiSun,
  HiVideoCamera,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import MenuItemNoLink from "../../atoms/MenuItemNoLink";
import { changeThemeId } from "../../../store/actions/games.actions";
import { random } from "chroma-js";

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
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;

  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    if (games.length > 0) {
      if (typeof window !== "undefined") {
        setSelectedGame(
          (old) => localStorage.getItem("SELECTED_GAME") || games[0].id
        );
      }
    }
  }, [games]);

  return (
    <Container>
      <MenuItemContainer>
        <MenuItem to="/games" title="Games" icon={<HiViewGrid />} />
      </MenuItemContainer>
      {selectedGame && (
        <MenuItemContainer>
          <MenuItem
            to={`/games/${selectedGame}`}
            title="Ongoing"
            icon={<HiChartBar />}
          />
        </MenuItemContainer>
      )}
      <MenuItemContainer>
        <MenuItem
          to={`/planner/${selectedGame}`}
          title="Unlocks"
          icon={<HiChartBar />}
        />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/games" title="Settings" icon={<HiAdjustments />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem to="/" title="Refresh" icon={<HiArrowsExpand />} />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItemNoLink
          title="Theme"
          icon={<HiVideoCamera />}
          onClick={() => {
            if (games.length > 0) {
              const randomImage =
                games[Math.floor(Math.random() * games.length)].id;
              dispatch(changeThemeId(randomImage));
            }
          }}
        />
      </MenuItemContainer>
    </Container>
  );
}
