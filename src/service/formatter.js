export const CapitalizeEachLetter = (text) => {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const PhoneNumberFormatter = (val) => {
  return val.replace(/[^0-9]/g, '');
}