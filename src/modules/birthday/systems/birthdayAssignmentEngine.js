export function birthdayHue(day) {
  return (day / 365) * 320 + 25;
}

export function birthdayLabel(day) {
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let remaining = day;
  for (let month = 0; month < monthLengths.length; month += 1) {
    if (remaining < monthLengths[month]) return `${months[month]} ${remaining + 1}`;
    remaining -= monthLengths[month];
  }
  return 'Dec 31';
}

export function assignBirthday() {
  return Math.floor(Math.random() * 365);
}
