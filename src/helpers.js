// текущая дата в формате (0 января 0000 г.)
export const currentDate = new Date().toLocaleString("ru", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
// дата в формате (вс, 21 марта)
export const shortDate = new Date().toLocaleString("ru", {
  day: "numeric",
  month: "long",
  weekday: "short",
});
// получение случайного значения в диапазоне 0 - 99
export function getTodoId(min = 0, max = 100) {
  const randomNum = Math.random() * (max - min) + min; // 1-99
  return Math.round(Date.parse(new Date()) + randomNum);
}
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
