export const formatDate = (date) => {
  if (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    let formattedDate = "";
    formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}\n${hour < 10 ? "0" : ""}${hour}:${
      minute < 10 ? "0" : ""
    }${minute}`;
    return formattedDate;
  }
};

export const convertToUTC = (date) => {
  date = new Date(date);
  const offsetInMinutes = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() - offsetInMinutes * 60 * 1000);
  return utcDate;
};
//format number

export const formatNumber = (number) => {
  if (number <= 0) {
    return 0;
  }
  return new Intl.NumberFormat("de-DE").format(number);
};

export const convertPhone = (phone, convertToPhoneVN = false) => {
  if (convertToPhoneVN) {
    const strPhone = phone.slice(2);
    return `0${strPhone}`;
  }
  if (phone.startsWith("84")) return phone;
  const strPhone = phone.slice(1);
  return `84${strPhone}`;
};

export const numberToVnd = (input) => {
  const number = Number(input);
  if (typeof number !== "number") {
    return "invalid";
  }
  if (isNaN(number)) return "NaN";
  if (number % 1 !== 0) return "Số tiền phải tròn đơn vị đồng";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const isUrl = (input) => {
  const regex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(input);
};

export const validateHexColorPair = (input) =>
  /^#[0-9A-Fa-f]{6}\s*-\s*#[0-9A-Fa-f]{6}$/.test(input);
