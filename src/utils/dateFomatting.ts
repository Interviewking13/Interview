export const dateFomatting = (date: string) => {
  return date.replaceAll("-", ".");
};

export const dateSplice = (input: string) => {
  const dateString = input;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()의 반환값은 0부터 시작하므로 +1 해줍니다.
  const day = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return formattedDate;
};
