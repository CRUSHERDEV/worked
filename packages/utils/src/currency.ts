import type { Currency } from "@linked-all/types";

/**
 * Currency utilities for Linked All
 */

const currencySymbols: Record<Currency, string> = {
  NGN: "₦",
  KES: "KSh",
  GHS: "GH₵",
  ZAR: "R",
  USD: "$",
  EUR: "€",
};

const currencyDecimals: Record<Currency, number> = {
  NGN: 2,
  KES: 2,
  GHS: 2,
  ZAR: 2,
  USD: 2,
  EUR: 2,
};

export const formatCurrency = (
  amount: number,
  currency: Currency,
  options: {
    showSymbol?: boolean;
    showCode?: boolean;
    locale?: string;
  } = {}
): string => {
  const { showSymbol = true, showCode = false, locale = "en-US" } = options;
  
  const decimals = currencyDecimals[currency];
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  
  let result = formatted;
  
  if (showSymbol) {
    const symbol = currencySymbols[currency];
    result = `${symbol}${formatted}`;
  }
  
  if (showCode) {
    result = `${result} ${currency}`;
  }
  
  return result;
};

export const parseCurrency = (value: string, currency: Currency): number => {
  // Remove currency symbols and non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRates: Record<string, number>
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  const key = `${fromCurrency}_${toCurrency}`;
  const rate = exchangeRates[key];
  
  if (!rate) {
    throw new Error(`Exchange rate not found for ${key}`);
  }
  
  return amount * rate;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return currencySymbols[currency];
};

export const getCurrencyDecimals = (currency: Currency): number => {
  return currencyDecimals[currency];
};
