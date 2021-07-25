function numberWithCommas(x) {
  return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { numberWithCommas };
