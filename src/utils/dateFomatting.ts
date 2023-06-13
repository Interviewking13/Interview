export const dateFomatting = (date: string) => {
  return date.replaceAll("-", ".");
};

export const dateSplice = (input: string) => {
  const dateString = input;
  const date = new Date(dateString);
  const year = date.getFullYear() - 2000;
  const month = date.getMonth() + 1; // getMonth()의 반환값은 0부터 시작하므로 +1 해줍니다.
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`; // 월이 1~9일 경우 앞에 0을 붙입니다.
  const formattedDay = day < 10 ? `0${day}` : `${day}`; // 일이 1~9일 경우 앞에 0을 붙입니다.

  const formattedDate = `${year}.${formattedMonth}.${formattedDay}`;
  return formattedDate;
};
