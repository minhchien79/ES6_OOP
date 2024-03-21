// Student.js
import Person from './person.js';

class Student extends Person {
  constructor(id, fullName, address, email, math, physics, chemistry) {
    super(id, fullName, address, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  getAverageScore() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

export default Student;
