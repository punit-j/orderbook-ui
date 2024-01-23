export const formatAddress = (address) => {
  let trimmedAddress =
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 7, address.length);
  return trimmedAddress;
};

export const formatBalance = (balance) => {
  const bal = balance.substring(0, 6);
  return bal;
};
