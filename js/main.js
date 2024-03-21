// Định nghĩa lớp Person
class Person {
  constructor(id, fullName, address, email) {
    this.id = id;
    this.fullName = fullName;
    this.address = address;
    this.email = email;
  }
}

// Lớp Student kế thừa từ lớp Person
class Student extends Person {
  constructor(id, fullName, address, email, math, physics, chemistry) {
    super(id, fullName, address, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  // Phương thức tính điểm trung bình
  getAverageScore() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

// Lớp Employee kế thừa từ lớp Person
class Employee extends Person {
  constructor(id, fullName, address, email, workDays, dailySalary) {
    super(id, fullName, address, email);
    this.workDays = workDays;
    this.dailySalary = dailySalary;
  }

  // Phương thức tính lương
  calculateSalary() {
    return this.workDays * this.dailySalary;
  }
}

// Lớp Customer kế thừa từ lớp Person
class Customer extends Person {
  constructor(id, fullName, address, email, companyName, orderValue, rating) {
    super(id, fullName, address, email);
    this.companyName = companyName;
    this.orderValue = orderValue;
    this.rating = rating;
  }
}

// Lớp ListPerson để quản lý danh sách người dùng
class ListPerson {
  constructor() {
    this.persons = [];
    this.loadPersons();
  }

  addPerson(person) {
    this.persons.push(person);
    this.savePersons();
    this.displayPersons(); 
  }

  // Phương thức hiển thị danh sách người dùng trên trang web
  displayPersons(filteredPersons) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; 

    const personsToDisplay = filteredPersons || this.persons; 

    if (!personsToDisplay.length) {
      outputDiv.innerHTML = "<p>Không có người dùng nào.</p>";
      return;
    }

    const table = document.createElement("table");
    table.classList.add("person-table");

    // Sắp xếp danh sách theo thứ tự họ tên trước khi hiển thị
    this.sortByName();

    const tableHeader = `
        <tr>
            <th>Mã số</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Thông tin phụ</th>
            <th>Xóa</th>
        </tr>
    `;
    table.innerHTML += tableHeader;

    personsToDisplay.forEach((person) => {
      const row = document.createElement("tr");
      let personDetails = `
            <td>${person.id}</td>
            <td>${person.fullName}</td>
            <td>${person.email}</td>
            <td>${person.address}</td>
            <td>`;

      if (person instanceof Student) {
        personDetails += `Điểm trung bình: ${person
          .getAverageScore()
          .toFixed(2)}`;
      } else if (person instanceof Employee) {
        personDetails += `Lương: ${person.calculateSalary()}`;
      } else if (person instanceof Customer) {
        personDetails += `Tên công ty: ${person.companyName}`;
      }

      personDetails += `</td>
    <td>
        <button class="editButton" data-person-id="${person.id}">Edit</button>
        <button class="deleteButton" data-person-id="${person.id}">Delete</button>
    </td>`;

      row.innerHTML = personDetails;
      table.appendChild(row);
    });

    outputDiv.appendChild(table);
    this.savePersons();
  }

  // Phương thức sắp xếp danh sách theo thứ tự họ tên
  sortByName() {
    this.persons.sort((a, b) => {
      const nameA = a.fullName.toUpperCase();
      const nameB = b.fullName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  deletePerson(id) {
    this.persons = this.persons.filter((person) => person.id !== id);
    this.displayPersons(); 
    this.savePersons();
  }

  // Phương thức lưu trữ danh sách người dùng vào localStorage
  savePersons() {
    localStorage.setItem("persons", JSON.stringify(this.persons));
  }

  // Phương thức khôi phục danh sách người dùng từ localStorage
  loadPersons() {
    const storedPersons = localStorage.getItem("persons");
    this.persons = storedPersons ? JSON.parse(storedPersons) : [];
    this.displayPersons(); 
  }


  // Phương thức lọc danh sách người dùng theo loại
  filterByType(type) {
    const filteredPersons = this.persons.filter((person) => {
      if (type === "student") {
        return person instanceof Student;
      } else if (type === "employee") {
        return person instanceof Employee;
      } else if (type === "customer") {
        return person instanceof Customer;
      }
    });
    this.displayPersons(filteredPersons); // Hiển thị danh sách người dùng đã lọc
  }
}

const listPerson = new ListPerson(); // Khởi tạo đối tượng ListPerson


document.getElementById("updateButton").addEventListener("click", function () {
  // Lấy thông tin người dùng từ biểu mẫu
  const id = document.getElementById("id").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();
  const type = document.getElementById("type").value;

  let isValid = true;
  let errorMessage = "";

  // Kiểm tra tính hợp lệ của dữ liệu nhập vào
  if (fullName === "") {
    errorMessage += "Vui lòng nhập họ và tên.\n";
    isValid = false;
  }

  if (address === "") {
    errorMessage += "Vui lòng nhập địa chỉ.\n";
    isValid = false;
  }

  if (email === "") {
    errorMessage += "Vui lòng nhập địa chỉ email.\n";
    isValid = false;
  } else if (!isValidEmail(email)) {
    errorMessage += "Địa chỉ email không hợp lệ.\n";
    isValid = false;
  }

  // Kiểm tra các trường dữ liệu phụ thuộc vào loại người dùng
  if (type === "student") {
    const math = parseFloat(document.getElementById("math").value.trim());
    const physics = parseFloat(document.getElementById("physics").value.trim());
    const chemistry = parseFloat(document.getElementById("chemistry").value.trim());

    if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
      errorMessage += "Vui lòng nhập điểm số hợp lệ cho học viên.\n";
      isValid = false;
    }
  } else if (type === "employee") {
    const workDays = parseInt(document.getElementById("workDays").value.trim());
    const dailySalary = parseInt(document.getElementById("dailySalary").value.trim());

    if (isNaN(workDays) || isNaN(dailySalary)) {
      errorMessage += "Vui lòng nhập số ngày làm việc và lương hợp lệ cho nhân viên.\n";
      isValid = false;
    }
  } else if (type === "customer") {
    const orderValue = parseInt(document.getElementById("orderValue").value.trim());
    const rating = parseFloat(document.getElementById("rating").value.trim());

    if (isNaN(orderValue) || isNaN(rating) || rating < 0 || rating > 5) {
      errorMessage += "Vui lòng nhập trị giá hóa đơn và đánh giá hợp lệ cho khách hàng.\n";
      isValid = false;
    }
  }

  // Nếu dữ liệu không hợp lệ, hiển thị thông báo lỗi
  if (!isValid) {
    alert(errorMessage);
    return;
  }

  // Tìm và cập nhật thông tin của người dùng trong danh sách
  const person = listPerson.persons.find((person) => person.id === id);
  if (person) {
    // Cập nhật thông tin người dùng
    person.fullName = fullName;
    person.address = address;
    person.email = email;

    // Cập nhật thông tin phụ thuộc vào loại người dùng
    if (type === "student") {
      const math = parseFloat(document.getElementById("math").value.trim());
      const physics = parseFloat(document.getElementById("physics").value.trim());
      const chemistry = parseFloat(document.getElementById("chemistry").value.trim());
      person.math = math;
      person.physics = physics;
      person.chemistry = chemistry;
    } else if (type === "employee") {
      const workDays = parseInt(document.getElementById("workDays").value.trim());
      const dailySalary = parseInt(document.getElementById("dailySalary").value.trim());
      person.workDays = workDays;
      person.dailySalary = dailySalary;
    } else if (type === "customer") {
      const companyName = document.getElementById("companyName").value.trim();
      const orderValue = parseInt(document.getElementById("orderValue").value.trim());
      const rating = parseFloat(document.getElementById("rating").value.trim());
      person.companyName = companyName;
      person.orderValue = orderValue;
      person.rating = rating;
    }

    listPerson.displayPersons();
  }

  // Reset biểu mẫu và chuyển nút "Cập nhật" thành nút "Thêm"
  resetForm();
  document.getElementById("submitButton").style.display = "block";
  document.getElementById("updateButton").style.display = "none";
});
// Bắt sự kiện click vào nút Delete
document.getElementById("output").addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    const personId = event.target.dataset.personId;
    listPerson.deletePerson(personId); // Xóa người dùng khỏi danh sách
  } else if (event.target.classList.contains("editButton")) {
    const personId = event.target.dataset.personId;
    const personToEdit = listPerson.persons.find(
      (person) => person.id === personId
    );
    if (personToEdit) {
      // Điền thông tin của người dùng vào biểu mẫu
      document.getElementById("id").value = personToEdit.id;
      document.getElementById("fullName").value = personToEdit.fullName;
      document.getElementById("address").value = personToEdit.address;
      document.getElementById("email").value = personToEdit.email;

      // Thiết lập các trường phụ thuộc vào loại người dùng
      if (personToEdit instanceof Student) {
        document.getElementById("type").value = "student";
        document.getElementById("math").value = personToEdit.math;
        document.getElementById("physics").value = personToEdit.physics;
        document.getElementById("chemistry").value = personToEdit.chemistry;
      } else if (personToEdit instanceof Employee) {
        document.getElementById("type").value = "employee";
        document.getElementById("workDays").value = personToEdit.workDays;
        document.getElementById("dailySalary").value = personToEdit.dailySalary;
      } else if (personToEdit instanceof Customer) {
        document.getElementById("type").value = "customer";
        document.getElementById("companyName").value = personToEdit.companyName;
        document.getElementById("orderValue").value = personToEdit.orderValue;
        document.getElementById("rating").value = personToEdit.rating;
      }

      // Đổi nút "Thêm" thành nút "Cập nhật" và hiển thị nút "Cập nhật"
      document.getElementById("submitButton").style.display = "none";
      document.getElementById("updateButton").style.display = "block";
    }
  }
})


document.getElementById("filterButton").addEventListener("click", function () {
  const selectedType = document.getElementById("filterType").value;
  listPerson.filterByType(selectedType); // Sử dụng đối tượng đã khởi tạo trước đó
});

// Bắt sự kiện submit form
document
  .getElementById("personForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const type = document.getElementById("type").value;

    let isValid = true;
    let errorMessage = "";

    // Kiểm tra tính hợp lệ của dữ liệu nhập vào
    if (fullName === "") {
      errorMessage += "Vui lòng nhập họ và tên.\n";
      isValid = false;
    }

    if (address === "") {
      errorMessage += "Vui lòng nhập địa chỉ.\n";
      isValid = false;
    }

    if (email === "") {
      errorMessage += "Vui lòng nhập địa chỉ email.\n";
      isValid = false;
    } else if (!isValidEmail(email)) {
      errorMessage += "Địa chỉ email không hợp lệ.\n";
      isValid = false;
    }

    // Kiểm tra các trường dữ liệu phụ thuộc vào loại người dùng
    if (type === "student") {
      const math = parseFloat(document.getElementById("math").value.trim());
      const physics = parseFloat(
        document.getElementById("physics").value.trim()
      );
      const chemistry = parseFloat(
        document.getElementById("chemistry").value.trim()
      );

      if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
        errorMessage += "Vui lòng nhập điểm số hợp lệ cho học viên.\n";
        isValid = false;
      }
    } else if (type === "employee") {
      const workDays = parseInt(
        document.getElementById("workDays").value.trim()
      );
      const dailySalary = parseInt(
        document.getElementById("dailySalary").value.trim()
      );

      if (isNaN(workDays) || isNaN(dailySalary)) {
        errorMessage +=
          "Vui lòng nhập số ngày làm việc và lương hợp lệ cho nhân viên.\n";
        isValid = false;
      }
    } else if (type === "customer") {
      const orderValue = parseInt(
        document.getElementById("orderValue").value.trim()
      );
      const rating = parseFloat(document.getElementById("rating").value.trim());

      if (isNaN(orderValue) || isNaN(rating) || rating < 0 || rating > 5) {
        errorMessage +=
          "Vui lòng nhập trị giá hóa đơn và đánh giá hợp lệ cho khách hàng.\n";
        isValid = false;
      }
    }

    // Nếu dữ liệu không hợp lệ, hiển thị thông báo lỗi
    if (!isValid) {
      alert(errorMessage);
      return;
    }

    // Nếu dữ liệu hợp lệ, tạo đối tượng person và thêm vào danh sách
    let person;

    if (type === "student") {
      const math = parseFloat(document.getElementById("math").value.trim());
      const physics = parseFloat(
        document.getElementById("physics").value.trim()
      );
      const chemistry = parseFloat(
        document.getElementById("chemistry").value.trim()
      );
      person = new Student(
        id,
        fullName,
        address,
        email,
        math,
        physics,
        chemistry
      );
    } else if (type === "employee") {
      const workDays = parseInt(
        document.getElementById("workDays").value.trim()
      );
      const dailySalary = parseInt(
        document.getElementById("dailySalary").value.trim()
      );
      person = new Employee(
        id,
        fullName,
        address,
        email,
        workDays,
        dailySalary
      );
    } else if (type === "customer") {
      const companyName = document.getElementById("companyName").value.trim();
      const orderValue = parseInt(
        document.getElementById("orderValue").value.trim()
      );
      const rating = parseFloat(document.getElementById("rating").value.trim());
      person = new Customer(
        id,
        fullName,
        address,
        email,
        companyName,
        orderValue,
        rating
      );
    }

    listPerson.addPerson(person);
    resetForm();
  });

// Hàm kiểm tra định dạng email hợp lệ
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Bắt sự kiện thay đổi loại người dùng
document.getElementById("type").addEventListener("change", function () {
  const selectedType = this.value;
  const studentFields = document.getElementById("studentFields");
  const employeeFields = document.getElementById("employeeFields");
  const customerFields = document.getElementById("customerFields");

  // Ẩn tất cả các trường nhập dữ liệu
  studentFields.style.display = "none";
  employeeFields.style.display = "none";
  customerFields.style.display = "none";

  // Hiển thị các trường nhập dữ liệu phù hợp với loại người dùng được chọn
  if (selectedType === "student") {
    studentFields.style.display = "block";
  } else if (selectedType === "employee") {
    employeeFields.style.display = "block";
  } else if (selectedType === "customer") {
    customerFields.style.display = "block";
  }
});

// Hàm reset trang web sau khi thêm người dùng
function resetForm() {
  // Xóa nội dung của các trường nhập liệu
  document.getElementById("id").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("math").value = "";
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
  document.getElementById("workDays").value = "";
  document.getElementById("dailySalary").value = "";
  document.getElementById("companyName").value = "";
  document.getElementById("orderValue").value = "";
  document.getElementById("rating").value = "";

  // Thiết lập lại các trường nhập liệu phụ thuộc vào loại người dùng
  const studentFields = document.getElementById("studentFields");
  const employeeFields = document.getElementById("employeeFields");
  const customerFields = document.getElementById("customerFields");

  studentFields.style.display = "none";
  employeeFields.style.display = "none";
  customerFields.style.display = "none";
}
