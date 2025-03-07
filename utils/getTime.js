export function getTime() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const vietnamTime = new Date(utcTime + 7 * 60 * 60000);
  const hour = vietnamTime.getHours();
  let greetingText = "";
  if (hour < 12) {
    greetingText = "Chào buổi sáng";
  } else if (hour < 18) {
    greetingText = "Chào buổi chiều";
  } else {
    greetingText = "Chào buổi tối";
  }
  return greetingText;
}
