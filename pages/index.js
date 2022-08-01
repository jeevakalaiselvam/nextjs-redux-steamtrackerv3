import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Page from "../components/organisms/Page";
import GamesContent from "../components/ui/content/GamesContent";
import GamesHeader from "../components/ui/header/GamesHeader";
import GamesLeftSidebar from "../components/ui/leftsidebar/GamesLeftSidebar";
import GamesRightSidebar from "../components/ui/rightsidebar/GamesRightSidebar";
import { fetchAllGames } from "../store/actions/games.actions";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, []);

  return (
    <Page
      leftSidebar={<GamesLeftSidebar />}
      content={<GamesContent />}
      header={<GamesHeader />}
      rightSidebar={<GamesRightSidebar />}
    />
  );
}
