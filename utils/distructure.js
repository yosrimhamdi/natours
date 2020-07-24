class Distructure {
  constructor(query) {
    this.query = query;
    this.filter = this.getFilter();
    this.fields = this.getFields();
    this.page = this.getPage();
    this.limit = this.getLimit();
    this.sort = this.getSort();
  }

  getFilter() {
    const filter = { ...this.query };
    const exclude = ['limit', 'fields', 'sort', 'page'];

    exclude.forEach((element) => {
      delete filter[element];
    });

    return this.add$(filter);
  }

  getFields() {
    return this.replaceComma(this.query.fields) || '-__v';
  }

  getPage() {
    return parseInt(this.query.page, 10) || 1;
  }

  getLimit() {
    return parseInt(this.query.limit, 10) || 10;
  }

  getSort() {
    return this.replaceComma(this.query.sort) || 'price';
  }

  add$(filterObject) {
    let filter = JSON.stringify(filterObject);

    filter = filter.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);

    return JSON.parse(filter);
  }

  replaceComma(fields = '') {
    return fields.replace(/,/g, ' ');
  }
}

module.exports = Distructure;
