export const getTimeElasped = (timestamp) => {
  try {
    const startTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = currentTime - startTime;
    const minutesElapsed = Math.floor(timeDifference / (1000 * 60));

    if (minutesElapsed < 1) {
      return "Just now";
    } else if (minutesElapsed < 60) {
      return `${minutesElapsed} minute${minutesElapsed === 1 ? "" : "s"} ago`;
    } else if (minutesElapsed < 24 * 60) {
      const hoursElapsed = Math.floor(minutesElapsed / 60);
      return `${hoursElapsed} hour${hoursElapsed === 1 ? "" : "s"} ago`;
    } else if (minutesElapsed < 24 * 60 * 7) {
      const daysElapsed = Math.floor(minutesElapsed / (24 * 60));
      return `${daysElapsed} day${daysElapsed === 1 ? "" : "s"} ago`;
    } else if (minutesElapsed < 24 * 60 * 30) {
      const weeksElapsed = Math.floor(minutesElapsed / (24 * 60 * 7));
      return `${weeksElapsed} week${weeksElapsed === 1 ? "" : "s"} ago`;
    } else if (minutesElapsed < 24 * 60 * 30 * 12) {
      const monthsElapsed = Math.floor(minutesElapsed / (24 * 60 * 30));
      return `${monthsElapsed} month${monthsElapsed === 1 ? "" : "s"} ago`;
    } else {
      const yearsElapsed = Math.floor(minutesElapsed / (24 * 60 * 30 * 12));
      return `${yearsElapsed} year${yearsElapsed === 1 ? "" : "s"} ago`;
    }
  } catch (e) {
    return "1 day ago";
  }
};
