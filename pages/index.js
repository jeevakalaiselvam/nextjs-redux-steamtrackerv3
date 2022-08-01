import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Page from "../components/organisms/Page";
import { fetchAllGames } from "../store/actions/games.actions";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, []);

  return (
    <Page
      leftSidebar={<h1>LeftSidebar</h1>}
      content={<h1>Content</h1>}
      header={<h1>Header</h1>}
      rightSidebar={<h1>RightSidebar</h1>}
    />
  );
}
