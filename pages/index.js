import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  useEffect(() => {
    
  }, []);

  const games = useSelector((state) => state.games);
  return <div>{JSON.stringify(games)}</div>;
}
