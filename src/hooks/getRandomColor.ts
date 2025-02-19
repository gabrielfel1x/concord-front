import { colors } from "../utils";

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};