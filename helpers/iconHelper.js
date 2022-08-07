import { AiFillGold } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";

export const getIcon = (type) => {
  switch (type) {
    case "trophy":
      return <FaTrophy />;
    case "xp":
      return <AiFillGold />;
    default:
      return <AiFillGold />;
  }
};
