class TableView {
  _topElement = document.querySelector("#table--section");
  _parentElement = document.querySelector(".table_contents--row");
  _data;
  _searchElement = document.querySelector("#searchCountries");

  renderCountryData(data) {
    this._data = data;
    const pElement = this._parentElement;
    this.clear();
    pElement.classList.remove("flex");
    this._data.forEach((country) => {
      const markup = this.renderMarkup(country);
      //   console.log(markup);
      pElement.insertAdjacentHTML("beforeend", markup);
    });
  }
  renderMarkup(country) {
    const markup = `
    <div class="row">
      <div class="row-country row-value">
                    <h1 class="row-country--name heading-mini">
                      ${country.countryName}
                    </h1>
                  </div>
                    <!-- !Cases -->
                  <div class="row-cases row-value">
                    <p class="row-cases--value text-primary">
                      ${this.formatNumbers(
                        country.value.error
                          ? "-"
                          : country.value.confirmed.value
                      )}
                    </p>
                  </div>
                    <!-- !Deaths -->
                  <div class="row-deaths row-value">
                    <p class="row-deaths--value text-primary">
                      ${this.formatNumbers(
                        country.value.error ? "-" : country.value.deaths.value
                      )}
                    </p>
                  </div>
                  </div>`;
    return markup;
  }
  renderSearchResults(data) {
    let countryNameOnScreen = document.querySelectorAll(".row-country--name");
    countryNameOnScreen = Array.from(countryNameOnScreen);
    // console.log(countryNameOnScreen);
    this._searchElement.addEventListener("input", function (e) {
      // console.log(e.target.value);

      for (const country of countryNameOnScreen) {
        let countryName = country.textContent.trim().toLowerCase();
        // console.log(e.target.value);
        // console.log(countryName);
        if (!countryName.startsWith(e.target.value.toLowerCase())) {
          // console.log(country.closest(".row"));
          country.closest(".row").style.display = "none";
        } else {
          country.closest(".row").style.display = "flex";
        }
      }
      // console.log(countryNameOnScreen);
    });
  }
  renderSpinner() {
    const pElement = this._parentElement;
    pElement.classList.add("flex");
    const markup = ` <div class="spinner">        
      </div>`;
    // console.log(pElement);
    pElement.insertAdjacentHTML("afterbegin", markup);
  }
  clear() {
    this._parentElement.textContent = "";
  }
  formatNumbers(number) {
    if (typeof number !== "number") return "Not Available";
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  }
  addEventHandler(handler) {
    window.addEventListener("load", handler);
  }
}

export default new TableView();
