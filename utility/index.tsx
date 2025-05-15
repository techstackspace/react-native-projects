function formatNumber(num: number) {
  if (num < 1000) return num.toString();
  if (num < 1_000_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
}

function formatDateWorldwide(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return `${formatted} (Worldwide)`;
}

function formatCurrencyAbbreviation(amount: string) {
  const num = Number(amount.toString().replace(/[^0-9.-]+/g, ""));

  if (isNaN(num)) return amount;

  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(
      num % 1_000_000_000 === 0 ? 0 : 1
    )} billion`;
  } else if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(
      num % 1_000_000 === 0 ? 0 : 1
    )} million`;
  } else if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)} thousand`;
  } else {
    return `$${num}`;
  }
}

const countryList = (movieCountries: string[]) => {
  const countries = movieCountries?.flatMap((country, index, arr) =>
    index === arr.length - 1 ? [country] : [country, ""]
  );
  return countries;
};

const productionCompany = (movieProductionCompanies: string[]) => {
  const productionCompanies = movieProductionCompanies?.flatMap(
    (productionCompany: string, index: number, arr: string[]) =>
      index === arr.length - 1 ? [productionCompany] : [productionCompany, ""]
  );
  return productionCompanies;
};

export {
  formatNumber,
  formatDateWorldwide,
  formatCurrencyAbbreviation,
  countryList,
  productionCompany,
};