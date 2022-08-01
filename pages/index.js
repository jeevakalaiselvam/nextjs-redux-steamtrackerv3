import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGames } from "../store/actions/games.actions";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, []);

  return <div>{JSON.stringify(games)}</div>;
}
