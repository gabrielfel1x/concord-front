export const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#2ECC71"];
  return colors[Math.floor(Math.random() * colors.length)];
};