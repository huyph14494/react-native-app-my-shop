function formatDateTime(date) {
  let dateTmp = new Date(date);
  return `${dateTmp.getHours()}:${dateTmp.getMinutes()} ${dateTmp.getDate()}/${dateTmp.getMonth() +
    1}/${dateTmp.getFullYear()}`;
}

function formatDate(date) {
  let dateTmp = new Date(date);
  return `${dateTmp.getDate()}/${dateTmp.getMonth() +
    1}/${dateTmp.getFullYear()}`;
}

export {formatDateTime, formatDate};
