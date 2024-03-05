class Error {
  _parentElement = document.body;

  renderElement() {
    const markup = `
      <div class="error-modal">
        <div class="error-modal--content">
        
          <p class="error-modal--message text-primary">Data currently unavailable, API deprecated. Feel free to check my code if you'd like</p>
          
        </div>
      </div>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new Error();
