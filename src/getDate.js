export default function getDate(increase = 0) {
  let dateToday = new Date();

  if (increase != 0) {
    dateToday.setDate(dateToday.getDate() + increase);
  }

  let day = ("0" + dateToday.getDate()).slice(-2);
  let month = ("0" + (dateToday.getMonth() + 1)).slice(-2);
  let year = dateToday.getFullYear();

  return `${year}-${month}-${day}`;
}
