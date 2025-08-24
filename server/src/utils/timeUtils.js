function compareTime(from_time, to_time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (timeRegex.test(from_time) && timeRegex.test(to_time)) {
    const from = new Date(`1970-01-01T${from_time}Z`);
    const to = new Date(`1970-01-01T${to_time}Z`);

    if (from >= to) return true;
    return false;
  }
}

export { compareTime };
