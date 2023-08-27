export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items.reverse(); // array with photo card information
    this._renderer = renderer; // function for creating photo cards
    this._container = document.querySelector(containerSelector); // the element in which are placed
  }

  // adding markup to a container
  addItem (element) {
    this._container.prepend(element);
  }

  // clearing the container of all photo cards
  clear() {
    [...this._container.querySelectorAll('.card')].forEach((card) => card.remove());
  }

  // creating element markup
  renderItems () {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}