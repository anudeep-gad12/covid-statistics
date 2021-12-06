import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import globalView from "./Views/GlobalCardView.js";
import tableView from "./Views/TableView.js";
import chartsView from "./Views/ChartsView.js";
import nav from "./Views/nav.js";

// ###############
//  Global card data
// ###############

const controlNav = function () {
  nav.renderHover();
  nav.renderSmoothScroll();
  nav.renderStickyNav();
};

const controlGlobalData = async function () {
  try {
    // render spinner
    globalView.renderSpinner();
    // get data from model
    await model.getGlobalData();
    globalView.renderGlobalData(model.state.global);
  } catch (err) {
    console.log(err);
  }
};

// const controlSmoothScrolling = function () {};

// ###############
//  Table Data
// ###############

const controlTableData = async function () {
  try {
    tableView.renderSpinner();
    await model.getCountriesCaseData();
    tableView.renderCountryData(model.state.countries.countryCaseData);
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    tableView.renderSearchResults();
  } catch (err) {
    console.log(err);
  }
};

// ###############
//  Charts
// ###############

const controlCharts = async function () {
  try {
    chartsView.renderSpinner();
    await Promise.resolve(model.getGlobalPreviousData());
    await Promise.resolve(model.getcalculatedGlobalPreviousData());
    await Promise.resolve(model.getChartsData());
    chartsView.renderCharts(model.state.chartsData);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlNav();
  controlGlobalData();
  (async function () {
    await Promise.resolve(controlTableData());
    await Promise.resolve(controlSearchResults());
    await Promise.resolve(controlCharts());
  })();
};

init();
