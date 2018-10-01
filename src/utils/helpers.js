
export const formatAsMoney = (amount) => (amount*1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');