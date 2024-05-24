const transpose = (matrix) =>
  matrix.reduce(
    (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
    []
  );

export { transpose };

const dayString = ["일", "월", "화", "수", "목", "금", "토"];
function localDateString(date){
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 2자리로 만듦
  const Date = date.getDate().toString().padStart(2, '0');
  const day = date.getDay();
  return `${year}년 ${month}월 ${Date}일 (${dayString[day]})`;
}
export {localDateString};