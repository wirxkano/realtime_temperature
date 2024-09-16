export function formatTime(day, hours, minutes) {
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

  const period = hours >= 12 ? 'PM' : 'AM';

  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${days[day]}, ${hours}:${formattedMinutes} ${period}`;
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
