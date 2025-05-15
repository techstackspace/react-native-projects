# Utility Functions

This module provides various utility functions to format numbers, dates, and currency abbreviations, as well as helper functions for displaying lists of countries and production companies.

## References

* [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
* [JavaScript Number Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

## Functions

### `formatNumber`

Formats a number for compact display, converting large numbers to abbreviated strings.

#### Parameters

| Name | Type   | Description                 |
| ---- | ------ | --------------------------- |
| num  | number | The number to be formatted. |

#### Returns

| Type   | Description              |
| ------ | ------------------------ |
| string | Formatted number string. |

#### Usage

```js
formatNumber(500); // "500"
formatNumber(1200); // "1.2K"
formatNumber(1500000); // "1.5M"
```

---

### `formatDateWorldwide`

Formats a date string (`YYYY-MM-DD`) into a more human-readable form with the "Worldwide" suffix.

#### Parameters

| Name       | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| dateString | string | Date in `YYYY-MM-DD` format. |

#### Returns

| Type   | Description            |
| ------ | ---------------------- |
| string | Formatted date string. |

#### Usage

```js
formatDateWorldwide("2023-11-15"); // "November 15, 2023 (Worldwide)"
```

---

### `formatCurrencyAbbreviation`

Formats a currency amount to a more readable form, adding appropriate abbreviations like "thousand," "million," or "billion."

#### Parameters

| Name   | Type   | Description                |
| ------ | ------ | -------------------------- |
| amount | string | Currency amount to format. |

#### Returns

| Type   | Description                |
| ------ | -------------------------- |
| string | Formatted currency string. |

#### Usage

```js
formatCurrencyAbbreviation("1000000"); // "$1 million"
formatCurrencyAbbreviation("2500000000"); // "$2.5 billion"
```

---

### `countryList`

Generates a comma-separated list of countries.

#### Parameters

| Name           | Type      | Description             |
| -------------- | --------- | ----------------------- |
| movieCountries | string\[] | Array of country names. |

#### Returns

| Type      | Description            |
| --------- | ---------------------- |
| string\[] | List of country names. |

#### Usage

```js
countryList(["USA", "Canada", "UK"]); // ["USA", "", "Canada", "", "UK"]
```

---

### `productionCompany`

Generates a comma-separated list of production companies.

#### Parameters

| Name                     | Type      | Description                        |
| ------------------------ | --------- | ---------------------------------- |
| movieProductionCompanies | string\[] | Array of production company names. |

#### Returns

| Type      | Description                       |
| --------- | --------------------------------- |
| string\[] | List of production company names. |

#### Usage

```js
productionCompany(["Warner Bros", "Universal"]); // ["Warner Bros", "", "Universal"]
```

---

## Exports

* `formatNumber`
* `formatDateWorldwide`
* `formatCurrencyAbbreviation`
* `countryList`
* `productionCompany`