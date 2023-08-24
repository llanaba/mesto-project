export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    console.log("I'm in SECTION")
    console.log(document.querySelector('#card'))
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // adding markup to a container
  addItem (element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  // creating element markup
  renderItems () {
    console.log("I'm in renderItems")
    console.log(document.querySelector('#card'))
    // this.clear();

    this._renderedItems.forEach(item => {
      console.log(document.querySelector('#card'))
      this._renderer(item);
    });
  }
}