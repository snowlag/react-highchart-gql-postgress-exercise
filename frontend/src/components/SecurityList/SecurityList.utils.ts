// Function to set the background color based on trend
export const getRowBackgroundColor = (trend: number) => {
  if (trend >= -100 && trend < -20) {
    return "#f56767";
  } else if (trend >= -20 && trend <= 20) {
    return "#beffbe";
  } else if (trend > 20 && trend <= 100) {
    return "#a2a2e5";
  }
  return "";
};
