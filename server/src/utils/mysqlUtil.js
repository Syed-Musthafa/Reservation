import moment from "moment";

function toMySQLTimestamp(date = new Date()) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export { toMySQLTimestamp };
