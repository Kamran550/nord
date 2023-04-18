export const format = (date: Date) => {
  if (!date) return '';

  const target = new Date(date);
  const day = `0${target.getDate()}`.slice(-2);
  const month = `0${target.getMonth() + 1}`.slice(-2);
  const year = target.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatWithTime = (date: Date) => {
  if (!date) return '';

  const target = new Date(date);
  const day = `0${target.getDate()}`.slice(-2);
  const month = `${target.getMonth() + 1}`.slice(-2);
  const year = target.getFullYear();
  const hours = `0${target.getHours()}`.slice(-2);
  const minutes = `0${target.getMinutes()}`.slice(-2);

  return `${day}${month}/${year} ${hours}:${minutes}`;
};


