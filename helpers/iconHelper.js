import { AiFillGold } from "react-icons/ai";
import { FaHourglass, FaMedal, FaTrophy } from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";
import { HiLightningBolt } from "react-icons/hi";

export const getIcon = (type) => {
  switch (type) {
    case "trophy":
      return <FaTrophy />;
    case "xp":
      return <HiLightningBolt />;
    case "medal":
      return <FaMedal />;
    case "ongoing":
      return <FaHourglass style={{ fontSize: "1.4rem" }} />;
    default:
      return <AiFillGold />;
  }
};
