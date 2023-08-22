export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // adding markup to a container
  addItem (element) {
    this._container.append(element);
  }

  // creating element markup
  renderItems () {
    const rezItems = '';
    this._renderedItems.forEach(item => {
      rezItems.after(this._renderer(item));
    });
    return rezItems;
  }
}