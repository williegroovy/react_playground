/*
*
* Singleton Pattern limits the number of instances of a particular object to just one.
* The single instance is called the singleton.
*
* Singletons are useful where system-wide actions need to be coordinated from a single central place.
*  - (database connection pool)
*   - The pool manages the creation, destruction, and lifetime of all database connections for the entire app ensuring
*   that no connections are 'lost'.
*
* Singletons reduce the need for global variables. Several other patterns, such as Factory, Prototype, and Facade
* are frequently implemented as Singletons when only one instance is needed.
 */

/* ***Disadvantages***
* In recent years singletons have gained a bad reputation as glorified 'global' variables
* Global variables are ill conceived and the potential cause of numerous bugs.
* They are hard to test with unit test because the instance cannot be easily overridden, and
* any form of parallelism in the test runner can introduce difficult to find race-conditions.
*
* They just have too much responsibility. They control themselves as well as their
* instantiation, clearly violating the single responsibility principle.
*
* Nearly all problems solved with singleton can be better solved with some other mechanism.
*/

/*
* *** --> Diagram <-- ***
*
* (getInstance())
*   [Singleton]
*
*
* *** --> Participants <-- ***
* Singleton -- In sample [Singleton].
*   - defines getInstance() which returns the unique instance.
*   - responsible for creating and managing the instance object.
*
 */

/*
The Singleton object is implemented as an immediate anonymous function.
The function executes immediately by wrapping it in brackets followed by two additional brackets.
It is called anonymous because it doesn't have a name.

The getInstance method is Singleton's gatekeeper. It returns the one and only instance of the object
while maintaining a private reference to it which is not accessible to the outside world.

The getInstance method demonstrates another design pattern called Lazy Load.
Lazy Load checks if an instance has already been created; if not, it creates one and stores it for future reference.
All subsequent calls will receive the stored instance. Lazy loading is a CPU and memory saving technique by creating
objects only when absolutely necessary.

Singleton is a manifestation of a common JavaScript pattern: the Module pattern.
Module is the basis to all popular JavaScript libraries and frameworks (jQuery, Backbone, Ember, etc.).
 */

const Singleton = (function() {
  let instance;

  function createInstance() {
    return new Object('I am the instance');
  }

  return {
    getInstance: function() {
      if(!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function run() {
  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();

  console.log(`Same instance? ${instance1 === instance2}`);
}