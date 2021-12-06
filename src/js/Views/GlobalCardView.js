class globalView {
  _parentElement = document.querySelectorAll(".cards");
  _data;
  _parentElementConfirmed = this._parentElement[0];
  _parentElementDeaths = this._parentElement[1];
  renderGlobalData(data) {
    this._data = data;
    this.clear();
    this.renderGlobalConfimed();
    this.renderGlobalDeaths();
    this.renderLastUpdate(this._data.lastUpdate);
  }
  renderGlobalConfimed() {
    const element = this._parentElementConfirmed.querySelector(".cards-value");
    element.innerHTML = "";
    element.insertAdjacentHTML("afterbegin", this.renderConfirmedMarkup());
  }
  renderGlobalDeaths() {
    const element = this._parentElementDeaths.querySelector(".cards-value");
    element.innerHTML = "";
    element.insertAdjacentHTML("afterbegin", this.renderDeathsMarkup());
  }
  renderLastUpdate(lastUpdate) {
    const confirmedElement =
      this._parentElementConfirmed.querySelector(".last-updated-date");
    const deathsElement =
      this._parentElementDeaths.querySelector(".last-updated-date");
    confirmedElement.textContent = lastUpdate;
    deathsElement.textContent = lastUpdate;
  }
  renderConfirmedMarkup() {
    const markup = `<p class="cards-value--confirmed heading-tertiary">
    ${this.formatNumbers(this._data.confirmed)}
</p>
`;
    return markup;
  }
  renderDeathsMarkup() {
    const markup = `<p class="cards-value--deaths heading-tertiary">
    ${this.formatNumbers(
      `${
        typeof this._data.deaths === "number"
          ? this._data.deaths
          : "Not Available"
      }`
    )}
  </p>
  `;
    return markup;
  }
  clear() {
    let element = document.querySelectorAll(".cards-value");
    element = Array.from(element);
    element.forEach((element) => (element.innerHTML = ""));
  }
  renderSpinner() {
    let pElement = document.querySelectorAll(".cards-value");
    // pElement.classList.add("flex");
    const markup = ` <div class="mini-spinner">        
      </div>`;
    // console.log(pElement);
    pElement = Array.from(pElement);
    pElement.forEach((element) => {
      element.insertAdjacentHTML("afterbegin", markup);
    });
  }
  formatNumbers(number) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  }
}

export default new globalView();
