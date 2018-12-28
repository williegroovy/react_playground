/*
* Prototype Pattern creates new objects and returns initialized values it copied from a prototype - or sample - object.
*  - Also known as Properties Pattern
*
*  Prototype Pattern is useful in the initialization of business objects with values that match the defaults
*  in the database. The prototype objects holds the default values that are copied over into a
*  newly created business object.
*
* Classical languages rarely use the Prototype Pattern, but JavaScript uses it as the means of
* constructing new objects and their prototypes.
*
 */

/*
* *** --> Diagram <-- ***
*
*   [Client] --> [Prototype]
*                         |
*                         |
*                     [Clones]
*
*
* *** --> Participants <-- ***
* Client -- In sample the run function.
*   - creates a new object by asking a prototype to clone itself.
*
* Prototype -- IN sample [CustomerPrototype]
*   - creates an interface to clone itself
*
* Clones -- In sample [Customer]
*   - the cloned objects that are being created
*
 */

/*
In the sample code we have a CustomerPrototype object that clones objects given a prototype object.
Its constructor function accepts a prototype of type Customer. Calling the clone method will generate a
new Customer object with its property values initialized with the prototype values.

This is the classical implementation of the Prototype pattern, but JavaScript can do this far more
effectively using its built-in prototype facility.
 */

function CustomerPrototype(proto) {
  this.proto = proto;

  this.clone = function() {
    const customer = new Customer();

    customer.first = this.proto.first;
    customer.last = this.proto.last;
    customer.status = this.proto.status;

    return customer;
  }
}

function Customer(first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;

  this.say = function() {
    console.log(`name: ${this.first} ${this.last}, status: ${this.status}`);
  }
}

function run() {
  const proto = new Customer('n/a', 'n/a', 'pending');
  const prototype = new CustomerPrototype(proto);

  const customer = prototype.clone();
  customer.say();
}