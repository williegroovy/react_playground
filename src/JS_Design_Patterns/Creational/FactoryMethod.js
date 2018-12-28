/*
* Factory Method creates new objects as instructed by the client. With JavaScript objects can be created with
* the new operator, but there are situations where the client does not, or should not know which one of several
* candidate objects to instantiate.
*
* Factory method allows the delegation object creation while still retaining control over which type to instantiate.
*
* Key objective of Factory Method is ***extensibility***
*
* Factory Methods are often used in aps that manage, maintain, or manipulate collections of objects that are different
* but have many characteristics (methods and properties) in common.
*  - (collection of docs with a mix of xml, Pdf, Rtf, etc...)
 */

/*
* *** --> Diagram <-- ***
*
*         (factoryMethod())
*   [Creator] --> [AbstractProduct]
*                         |
*                         |
*                   [[[Products]
*
*
* *** --> Participants <-- ***
* Creator -- In sample [Factory]
*   - the 'factory' object that creates new products
*   - implements 'factoryMethod' which returns newly created products
*
* AbstractProduct -- not used in JavaScript
*   - declares an interface for  products
*
* ConcreteProduct -- In sample [Employees]
*   - the product being created
*   - all products support the same interface (properties and methods)
 */

/*
In this JavaScript example the Factory object creates four different types of employees.
Each employee type has a different hourly rate. The createEmployee method is the actual Factory Method.
The client instructs the factory what type of employee to create by passing a type argument into the Factory Method.

The AbstractProduct in the diagram is not implemented because Javascript does not support abstract classes or interfaces.
However, we still need to ensure that all employee types have the same interface (properties and methods).

Four different employee types are created; all are stored in the same array.
Each employee is asked to say what they are and their hourly rate.
 */

function Factory() {
  this.createEmployee = function(type) {
    let employee;

    if(type === 'fulltime') {
      employee = new FullTime();
    } else if(type === 'parttime') {
      employee = new PartTime();
    } else if(type === 'temporary') {
      employee = new Temporary();
    } else if(type === 'contractor') {
      employee = new Contractor();
    }

    employee.type = type;
    employee.say = function() {
      console.log(`${this.type}: rate ${this.hourly}/hour`);
      return employee;
    }
  }
}

const FullTime = function() {
  this.hourly = '$12';
};

const PartTime = function() {
  this.hourly = '$11';
};

const Temporary = function() {
  this.hourly = '$10';
};

const Contractor = function() {
  this.hourly = '$15';
};

function sayHey(persons) {
  persons.map(curr => curr.say());
}

function run() {
  const employeeTypes = ['fulltime', 'parttime', 'temporary', 'contractor'];
  const factory = new Factory();

  const employees = employeeTypes.map(type => factory.createEmployee(type));
  sayHey(employees);
}