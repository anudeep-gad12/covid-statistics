import { URL } from "./config.js";
import { getJSONdata } from "./helper.js";

export const state = {
  global: {
    confirmed: 0,
    deaths: 0,
    lastUpdate: "",
    previousDayConfirm: 0,
    previousDayDeaths: 0,
  },

  countries: {
    countryList: [],
    countryCaseData: [],
  },

  previousStatistics: {
    datesCalculated: [],
    datesGlobal: [],
    GlobalPreviousData: [],
  },
  chartsData: {},
};

// #################################
// Get Global data
// #################################
export const getGlobalData = async function () {
  try {
    const data = await getJSONdata(`${URL}`);
    // console.log(data);
    state.global.confirmed = data.confirmed.value;
    state.global.deaths = data.deaths.value;
    state.global.lastUpdate = new Date(data.lastUpdate).toDateString().slice(4);
  } catch (err) {
    throw err;
  }
};
// #################################
// Get countryList
// #################################
const getCountriesData = async function () {
  try {
    const data = await getJSONdata(`${URL}/countries`);
    data.countries.forEach((country) => {
      state.countries.countryList.push(country.name);
    });
  } catch (err) {
    console.log(err);
  }
};

// #################################
// Get all countries data for table
// #################################
export const getCountriesCaseData = async function () {
  try {
    await getCountriesData();
    const allCountries = state.countries.countryList;
    //  simultaneous fetching
    const values = await Promise.allSettled(
      allCountries.map(async (country) => {
        const res = await fetch(`${URL}/countries/${country}`);
        return await res.json();
      })
    );
    for (let i = 0; i < values.length; i++) {
      state.countries.countryCaseData.push({
        countryName: allCountries[i],
        ...values[i],
      });
    }
  } catch (err) {
    throw err;
  }
};

// #################################
// Recent Date
// ################################
const latestDate = function () {
  const date = new Date(Date.now());
  date.setDate(date.getDate() - 1);
  const formattedDate = date
    .toLocaleString()
    .split(",")[0]
    .toString()
    .replaceAll("/", "-");
  return formattedDate;
};
const getListOfDatesUntilToday = function (start, end) {
  let listOfDatesNew = [];
  let date = new Date(start);
  while (date <= end) {
    listOfDatesNew.push(
      new Date(date)
        .toLocaleString()
        .split(",")[0]
        .toString()
        .replaceAll("/", "-")
    );
    date.setDate(date.getDate() + 4);
  }
  state.previousStatistics.datesCalculated = listOfDatesNew;
};
// #################################
// Previous Data for Charts
// #################################
export const getGlobalPreviousData = async function () {
  try {
    const data = await getJSONdata(`${URL}/daily`);
    data.forEach((value) => {
      state.previousStatistics.GlobalPreviousData.push({
        confirmed: value.confirmed.total,
        deaths: value.deaths.total,
      });
      state.previousStatistics.datesGlobal.push(value.reportDate);
    });
  } catch (err) {
    throw err;
  }
};
export const getcalculatedGlobalPreviousData = async function () {
  try {
    getListOfDatesUntilToday(new Date("2-1-2021"), new Date(latestDate()));
    const dates = state.previousStatistics.datesCalculated;
    // console.log(dates);
    const stats = await Promise.allSettled(
      dates.map(async (date) => {
        const res = await fetch(`${URL}/daily/${date}`);
        return res.json();
      })
    );
    for (const x of stats) {
      let confirmedSum = 0;
      let deathsSum = 0;
      for (const y of x.value) {
        confirmedSum += Number(y.confirmed);
        deathsSum += Number(y.deaths);
      }
      state.previousStatistics.GlobalPreviousData.push({
        confirmed: confirmedSum,
        deaths: deathsSum,
      });
    }
  } catch (err) {
    throw err;
  }
};

// #################################
// Charts Data
// #################################
export const getChartsData = function () {
  const chart = state.chartsData;
  const confirmed = state.previousStatistics.GlobalPreviousData.map(
    (data) => data.confirmed
  );
  const deaths = state.previousStatistics.GlobalPreviousData.map(
    (data) => data.deaths
  );
  let labelDates = [
    ...state.previousStatistics.datesGlobal,
    ...state.previousStatistics.datesCalculated,
  ];
  if (!chart["labels"])
    chart["labels"] = labelDates.map((date) => {
      const monthYear = new Date(date).toDateString().split(" ");
      return `${monthYear[1]} ${monthYear[3]}`;
    });
  chart["datasets"] = [
    {
      label: "Infected",
      data: confirmed,
      fill: false,
      borderColor: "#2f9e44",
      tension: 0.1,
    },
    {
      label: "Deaths",
      data: deaths,
      fill: false,
      borderColor: "#f03e3e",
      tension: 0.1,
    },
  ];
};
