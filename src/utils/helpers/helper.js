const marqueeDuration = marqueeText => {
  let textlength = marqueeText?.length;
  let duration = Math.round((textlength / 16) * 4800);
  return duration;
};

export {marqueeDuration};

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

export function dateMonth(time) {
  const exactTime = new Date(time);
  const currentTime = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month and date from the Date object

  const year = exactTime.getFullYear();
  const currentYear = currentTime.getFullYear();

  const month = monthNames[exactTime.getMonth()];
  const date = exactTime.getDate();

  // Format the result as "Month Date"
  const formattedDate = `${month}, ${year}`;

  return formattedDate;
}

export const getFilteredMentionedUsers = (value, mentionedUser) => {
  try {
    const filteredMentionedUser = {};
    const valueSplit = value.split("@");

    valueSplit.map(item => {
      const team_name = item?.split(" ")[0];
      if (mentionedUser?.[team_name]) {
        filteredMentionedUser[team_name] = mentionedUser[team_name];
      }
    });
    return filteredMentionedUser;
  } catch (err) {
    return {};
  }
};

export const secToMinutes = value => {
  // Calculate minutes and seconds
  let minutes = Math.floor(value / 60);
  let seconds = value % 60;

  // Format minutes and seconds to have leading zeros if necessary
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${minutes} : ${seconds}`;
};
