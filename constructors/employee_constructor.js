
class Employee {
    constructor(first, last, title, department, salary, manager) {
        this.firstName = first;
        this.lastName = last;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }
}
// class Role extends Employee {
//     constructor(first, last, manager, title, salary) {
//         super(first, last, manager)
//         this.salary = salary;
//         this.title = title;
//     }
// }

// class Department extends Employee {
//     constructor(first, last, manager, department) {
//         super(first, last, manager)
//         this.department = department;
//     }
// }




module.exports = Employee;
