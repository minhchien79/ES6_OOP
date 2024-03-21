// Employee.js
import Person from './person.js';

class Employee extends Person {
  constructor(id, fullName, address, email, workDays, dailySalary) {
    super(id, fullName, address, email);
    this.workDays = workDays;
    this.dailySalary = dailySalary;
  }

  calculateSalary() {
    return this.workDays * this.dailySalary;
  }
}

export default Employee;
