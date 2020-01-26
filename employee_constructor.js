function Employee( first, last, title, department, salary, manager) {
    this.firstName = first;
    this.lastName = last;
    this.title = title;
    this.department = department;
    this.salary = salary;
    this.manager = manager;
}

module.exports = Employee;