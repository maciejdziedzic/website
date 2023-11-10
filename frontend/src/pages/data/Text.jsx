export const assetsReturnData = {
  title: "Assets Return",
  headers: ["Metric", "Description", "Source"],
  rows: [
    {
      metric: "GOLD",
      description: "Year-over-year return based on the gold price.",
      source: {
        name: "stooq.pl",
        url: "https://stooq.pl/q/d/?s=xauusd&c=0&d1=19691231&d2=20221230&i=y",
      },
    },
    {
      metric: "HOUSE",
      description:
        "Year-over-year return from median sales price of houses in the U.S.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/MSPUS",
      },
    },
    {
      metric: "SP500",
      description: "Year-over-year return based on the S&P500 index value.",
      source: {
        name: "stooq.pl",
        url: "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691230&d2=20221230&i=y",
      },
    },
    {
      metric: "BONDS10Y",
      description: "End-of-year yield for 10-year U.S. Treasury bonds.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/DGS10",
      },
    },
    {
      metric: "INFLATION",
      description: "Annual growth rate in the Consumer Price Index.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/CPIAUCSL",
      },
    },
  ],
};

export const macroChartData = {
  title: "Macroeconomic Chart",
  headers: ["Metric", "Description", "Source"],
  rows: [
    {
      metric: "HOUSE/WAGES",
      description:
        "Quarterly ratio of median U.S. house prices to monthly wages (calculated as 168 times the hourly rate).",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/AHETPI",
      },
    },
    {
      metric: "FED RATE",
      description: "Federal Effective Funds Rate.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/FEDFUNDS",
      },
    },
    {
      metric: "IYC",
      description: "Monthly Inverted Yield Curve.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/T10Y2Y",
      },
    },
    {
      metric: "US GDP",
      description: "Four-month moving average of quarterly GDP growth rate.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/GDP",
      },
    },
    {
      metric: "DEBT/GDP",
      description: "Quarterly ratio of federal debt to GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/GFDEGDQ188S",
      },
    },
    {
      metric: "CB. ASST./GDP",
      description: "Annual ratio of Central Bank assets to quarterly GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
      },
    },
    {
      metric: "M3/GDP",
      description: "Monthly ratio of Broad Money M3 to quarterly GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/MABMM301USM189S",
      },
    },
    {
      metric: "UNEMPL",
      description: "U.S. unemployment rate.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/UNRATE",
      },
    },
    {
      metric: "CPI",
      description: "Year-over-year change in the monthly Consumer Price Index.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/CPIAUCSL",
      },
    },
    {
      metric: "PPI",
      description: "Year-over-year change in the monthly Producer Price Index.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/PPIACO",
      },
    },
    {
      metric: "RES. OF DEP.",
      description:
        "Monthly ratio of depository institutions' reserves to quarterly GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/TOTRESNS",
      },
    },
    {
      metric: "C.P./GDP",
      description:
        "Quarterly ratio of after-tax corporate profits to quarterly GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/CP",
      },
    },
    {
      metric: "INDUST. PROD.",
      description: "Industrial Production Index (base year: 2017).",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/INDPRO",
      },
    },
    {
      metric: "GDP WORLD",
      description: "Annual growth rate of worldwide GDP.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
      },
    },
    {
      metric: "OIL",
      description: "WTI crude oil price.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/WTISPLC",
      },
    },
  ],
};

export const fedPolicyModelData = {
  title: "FED Policy Model",
  headers: ["Metric", "Description", "Source"],
  rows: [
    {
      metric: "CPI",
      description:
        "Logistic regression: Quarterly percentage change in the Consumer Price Index.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/CPIAUCSL",
      },
    },
    {
      metric: "UNEMPLOYMENT RATE QUARTER AVG",
      description:
        "Logistic regression: Quarterly average unemployment rate, calculated from three monthly rates.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/UNRATE",
      },
    },
    {
      metric: "FED POLICY",
      description:
        "Logistic regression: The model's target is determined by averaging monthly Federal Effective Rates to a quarterly basis, calculating the quarter-to-quarter change, and assigning 1 for an increase and 0 for no change or a decrease.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/FEDFUNDS",
      },
    },
    {
      metric: "PROJECTED CPI",
      description:
        "Logistic regression input: Web-scraped quarterly Consumer Price Index projection from the Federal Reserve Bank of Cleveland's published data, transformed from quarterly annualized percentage change to quarterly percentage change.",
      source: {
        name: "fed",
        url: "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting",
      },
    },
    {
      metric: "UNEMPLOYMENT RATE LATEST",
      description:
        "Logistic regression input: Most recent monthly unemployment rate.",
      source: {
        name: "fred",
        url: "https://fred.stlouisfed.org/series/UNRATE",
      },
    },
    {
      metric: "HYPOTETHICAL FED RATE",
      description:
        "GPT Model: The machine learning model evaluates the most recent Federal Reserve press release or speech, providing a percentage-based prediction of the likelihood of an interest rate increase.",
      source: {
        name: "fed",
        url: "https://www.federalreserve.gov/",
      },
    },
  ],
};
