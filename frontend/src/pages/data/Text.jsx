export const assetsReturnData = {
  title: "Assets Return",
  headers: ["Metric", "Description", "Source"],
  rows: [
    [
      "GOLD",
      "Year-over-year return based on the gold price.",
      "stooq.pl",
      "https://stooq.pl/q/d/?s=xauusd&c=0&d1=19691231&d2=20221230&i=y",
    ],
    [
      "HOUSE",
      "Year-over-year return from median sales price of houses in the U.S.",
      "fred",
      "https://fred.stlouisfed.org/series/MSPUS",
    ],
    [
      "SP500",
      "Year-over-year return based on the S&P500 index value.",
      "stooq.pl",
      "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691230&d2=20221230&i=y",
    ],
    [
      "BONDS10Y",
      "End-of-year yield for 10-year U.S. Treasury bonds.",
      "fred",
      "https://fred.stlouisfed.org/series/DGS10",
    ],
    [
      "INFLATION",
      "Annual growth rate in the Consumer Price Index.",
      "fred",
      "https://fred.stlouisfed.org/series/CPIAUCSL",
    ],
  ],
};

export const macroChartData = {
  title: "Macroeconomic Chart",
  headers: ["Metric", "Description", "Source"],
  rows: [
    [
      "HOUSE/WAGES",
      "Quarterly ratio of median U.S. house prices to monthly wages (calculated as 168 times the hourly rate).",
      "fred",
      "https://fred.stlouisfed.org/series/AHETPI",
    ],

    [
      "FED RATE",
      "Federal Effective Funds Rate.",
      "fred",
      "https://fred.stlouisfed.org/series/FEDFUNDS",
    ],
    [
      "IYC",
      "Monthly Inverted Yield Curve.",
      "fred",
      "https://fred.stlouisfed.org/series/T10Y2Y",
    ],

    [
      "US GDP",
      "Four-month moving average of quarterly GDP growth rate.",
      "fred",
      "https://fred.stlouisfed.org/series/GDP",
    ],
    [
      "DEBT/GDP",
      "Quarterly ratio of federal debt to GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/GFDEGDQ188S",
    ],
    [
      "CB. ASST./GDP",
      "Annual ratio of Central Bank assets to quarterly GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
    ],
    [
      "M3/GDP",
      "Monthly ratio of Broad Money M3 to quarterly GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/MABMM301USM189S",
    ],
    [
      "UNEMPL",
      "U.S. unemployment rate.",
      "fred",
      "https://fred.stlouisfed.org/series/UNRATE",
    ],
    [
      "CPI",
      "Year-over-year change in the monthly Consumer Price Index.",
      "fred",
      "https://fred.stlouisfed.org/series/CPIAUCSL",
    ],
    [
      "PPI",
      "Year-over-year change in the monthly Producer Price Index.",
      "fred",
      "https://fred.stlouisfed.org/series/PPIACO",
    ],
    [
      "RES. OF DEP.",
      "Monthly ratio of depository institutions' reserves to quarterly GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/TOTRESNS",
    ],
    [
      "C.P./GDP",
      "Quarterly ratio of after-tax corporate profits to quarterly GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/CP",
    ],
    [
      "INDUST. PROD.",
      "Industrial Production Index (base year: 2017).",
      "fred",
      "https://fred.stlouisfed.org/series/INDPRO",
    ],
    [
      "GDP WORLD",
      "Annual growth rate of worldwide GDP.",
      "fred",
      "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
    ],
    [
      "OIL",
      "WTI crude oil price.",
      "fred",
      "https://fred.stlouisfed.org/series/WTISPLC",
    ],
  ],
};

export const fedPolicyModelData = {
  title: "FED Policy Model",
  headers: ["Metric", "Description", "Source"],
  rows: [
    [
      "CPI",
      "Quarterly percentage change in the Consumer Price Index.",
      "fred",
      "https://fred.stlouisfed.org/series/CPIAUCSL",
    ],
    [
      "UNEMPLOYMENT RATE QUARTER AVG",
      "Quarterly average unemployment rate, calculated from three monthly rates.",
      "fred",
      "https://fred.stlouisfed.org/series/UNRATE",
    ],

    [
      "FED POLICY",
      "The model's target is determined by averaging monthly Federal Effective Rates to a quarterly basis, calculating the quarter-to-quarter change, and assigning 1 for an increase and 0 for no change or a decrease.",
      "fred",
      "https://fred.stlouisfed.org/series/FEDFUNDS",
    ],
    [
      "PROJECTED CPI",
      "Web-scraped quarterly Consumer Price Index projection from the Federal Reserve Bank of Cleveland's published data, transformed from quarterly annualized percentage change to quarterly percentage change.",
      "fed",
      "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting",
    ],
    [
      "UNEMPLOYMENT RATE LATEST",
      "Most recent monthly unemployment rate.",
      "fred",
      "https://fred.stlouisfed.org/series/UNRATE",
    ],
    [
      "HYPOTETHICAL FED RATE",
      "The machine learning model evaluates the most recent Federal Reserve press release, providing a percentage-based prediction of the likelihood of an interest rate increase.",
      "fed",
      "https://www.federalreserve.gov/",
    ],
  ],
};
