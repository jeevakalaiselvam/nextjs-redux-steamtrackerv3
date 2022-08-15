import { AiFillGold } from "react-icons/ai";
import { FaMedal, FaTrophy } from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";

export const getIcon = (type) => {
  switch (type) {
    case "trophy":
      return <FaTrophy />;
    case "xp":
      return <AiFillGold />;
    case "medal":
      return <FaMedal />;
    default:
      return <AiFillGold />;
  }
};
