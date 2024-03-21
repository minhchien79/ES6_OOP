// Customer.js
import Person from './person.js';

class Customer extends Person {
  constructor(id, fullName, address, email, companyName, orderValue, rating) {
    super(id, fullName, address, email);
    this.companyName = companyName;
    this.orderValue = orderValue;
    this.rating = rating;
  }
}

export default Customer;
