class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderer() {
        this._items.forEach(item => {
            this._renderer(item)

        })
    }

    addItem(item) {
        this._container.append(item);
    }

    prependItem(item) {
        this._container.prepend(item);
    }
}

export default Section;