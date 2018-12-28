/*
* Creates objects that are related by a common theme. A factory in oop is an object that creates other objects.
* Abstract Factories abstracts the theme which is shared by newly created objects.
*
* Why leave the the construction of objects to others rather than simply calling a constructor with new keyword?
* A: Constructor functions are limited in their control over the overall creation process and sometimes control needs
* to be handed over to a factory with broader knowledge.
*
* ^ Includes scenarios where the creation process involves object caching, sharing or re-using of objects, complex logic,
* or apps that maintain object and type counts, and objects that interact with different resources or devices.
* - For more control over the object creation process, consider using a Factory
 */

/*
* *** --> Diagram <-- ***
* [AbstractFactory]
*       |
* [ConcreteFactory]
*           (create())
*       |
* [[[Products] ---> [Abstract Product]
*
*
*
* *** --> Participants <-- ***
* AbstractFactory -- not used in JavaScript
*   - declares and interface for creating products
*
* ConcreteFactory -- In sample [EmployeeFactory, VendorFactory]
*   - a factory object that 'manufactures' new products
*   - the create() method returns new products
*
* Products -- In sample code: [Employee, Vendor]
*   - the product instances being create by the factory
*
* AbstractProduct -- not used in JavaScript
*   - declares an interface for the products that are being created
 */

/*
In the example we have two Concrete Factories: EmployeeFactory and VendorFactory.
The first one creates Employee instances, the second one Vendor instances.
Both products are person types (with the same interface) which allows the client to treat them the same.
An array with two employees and two vendors is created. Each person is then asked to say what and who they are.

The log function is a helper which collects and displays results.
 */

function Employee(name) {
  this.name = name;

  this.say = function() {
    console.log(`I am employee ${name}`);
  };
}

function EmployeeFactory() {
  this.create = function(name) {
    return new Employee(name);
  };
}

function Vendor(name) {
  this.name = name;

  this.say = function() {
    console.log(`I am vendor ${name}`);
  };
}

function VendorFactory() {
  this.create = function(name) {
    return new Vendor(name);
  };
}

function sayHey(persons) {
  persons.map(curr => curr.say());
}

function run() {
  const staff = [
    { name: "Joan DiSilva", type: 'vendor' },
    { name: "Tim O'Neill", type: "employee" },
    { name: "Gerald Watson", type: "employee" },
    { name: "Nicole McNight", type: "vendor" }
  ];
  const employeeFactory = new EmployeeFactory();
  const vendorFactory = new VendorFactory();

  const persons = staff.map(person => {
    if(person.type === 'employee') {
      return employeeFactory.create(person);
    } else {
      return vendorFactory.create(person)
    }
  });

  sayHey(persons);

}