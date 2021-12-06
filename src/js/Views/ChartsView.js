import Chart from "chart.js/auto";
class ChartsView {
  _topElement = document.querySelector("#charts--section");
  _parentElement = document.querySelector(".charts");
  _data;
  renderCharts(data) {
    this._data = data;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", this.renderMarkup());
    const ctx = this._parentElement.querySelector("#myChart").getContext("2d");
    // console.log(this._data);
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this._data.labels,
        datasets: this._data.datasets,
      },
    });
  }
  renderMarkup(markup) {
    const mark = `<canvas id="myChart" width="400" height="400"></canvas>`;
    return mark;
  }
  renderSpinner() {
    const pElement = this._parentElement;
    pElement.classList.add("flex");
    const markup = ` <div class="spinner">        
      </div>`;
    pElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ChartsView();
