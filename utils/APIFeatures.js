class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'limit', 'page', 'fields'];

    excludedFields.forEach((ele) => delete queryObj[ele]);

    let query = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(query));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(',').join(' '),
      );
    }

    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 50;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
