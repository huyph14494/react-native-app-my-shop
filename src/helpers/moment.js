function formatDateTime(date) {
  let dateTmp = new Date(date);
  return `${dateTmp.getHours()}:${dateTmp.getMinutes()} - ${dateTmp.getDate()}/${dateTmp.getMonth() +
    1}/${dateTmp.getFullYear()}`;
}

function formatDate(date) {
  let dateTmp = new Date(date);
  return `${dateTmp.getDate()}/${dateTmp.getMonth() +
    1}/${dateTmp.getFullYear()}`;
}

function createUUID() {
  let dateTmp = new Date();
  return `${dateTmp.getHours()}_${dateTmp.getMinutes()}_${dateTmp.getSeconds()}_${dateTmp.getMilliseconds()}_${dateTmp.getDate()}_${dateTmp.getMonth() +
    1}_${dateTmp.getFullYear()}`;
}

export {formatDateTime, formatDate, createUUID};
