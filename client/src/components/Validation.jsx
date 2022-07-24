export const validateAddress = (address) => {
    const regex = new RegExp("^0x[a-fA-F0-9]{40}$");
    return regex.test(address);
  };
export const validateBigInt = (bigInt) => {
    const regex = new RegExp("^[1-9][0-9]*$");
    return regex.test(bigInt);
  };