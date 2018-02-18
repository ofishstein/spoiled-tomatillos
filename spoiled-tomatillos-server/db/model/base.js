const db = require('../db')

// A class for mapping an Object into our MySQL database.
class Base {

  create() {
    for each (let type, field in this.model) {
      console.log(type + ": " + field);
    }
  }

  get(filterKeys) {
    // TODO: Do a get and filter it based on the given filter args.
  }

  update() {
    // TODO: Update the entry to this information.
  }

  delete() {
    // TODO: Remove this value from the db
  }

}
