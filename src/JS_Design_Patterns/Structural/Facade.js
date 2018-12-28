/*
* Facade Pattern - special case of the Adapter pattern that provides a
*   simplified interface over a collection of classes.
*
* You can expand a single Adapter to provide an abstraction around a group of classes or an entire subsystem.
*
*/

/*
* *** --> Diagram <-- ***
*
*  (Interface)
*                   [IBaseClass]
*                         |
*  -----------------------------------------------
*                 ***SubComponent***
*        [Item1]       [Item2]      [Item3]

*
*/

/*
* The ChainMail armor takes an instance of armor that complies with the Armor interface. (BasicArmor)
* That instance is wrapped and calls proxied through. The method getArmorIntegrity modifies the result
* from the underlying class while calculateDamageFromHit modifies the arguments that are passed into the decorated
* class. This ChainMail class could, itself, be decorated with several more layers of decorators until a long chain
* of methods is actually called for each method call. This behavior remains invisible to outside callers.
*
* It is tempting to make use of JavaScript's ability to rewrite individual methods on classes to implement this
* pattern. Indeed, in an earlier draft of this section I had intended to suggest just that. However, doing so is
* syntactically messy and not a common way of doing things. One of the most important things to keep in mind
* when programming is that code must be maintainable, not only by you but also by others. Complexity breeds
* confusion and confusion breeds bugs.
*
* The decorator pattern is a valuable pattern for scenarios where inheritance is too limiting.
* These scenarios still exist in JavaScript, so the pattern remains useful.
 */

const Ship = (function() {
  function Ship() {
  }

  Ship.prototype.turnLeft = function() {};

  Ship.prototype.turnRight = function() {};

  Ship.prototype.goForward = function() {};

  return Ship;
})();

const Admiral = (function() {
  function Admiral() {}
  return Admiral;
})();

const SupplyCoordinator  = (function() {
  function SupplyCoordinator () {}
  return SupplyCoordinator ;
})();

const Transportation = {};
Transportation.Ship = Ship;
Transportation.Admiral = Admiral;
Transportation.SupplyCoordinator = SupplyCoordinator;

// Facade

const Fleet = (function() {
  function Fleet() {
  }

  Fleet.prototype.setDestination = function(destination) {
    // pass commands to a series of ships, admirals, and whoever needs it.
  };

  Fleet.prototype.resupply = function() {
    // pass commands to all ships to resupply;
  };

  Fleet.prototype.attack = function(destination) {
    // mount a coordinated attack on a destination
  };

  return Fleet;
});

/*
* Facades are useful abstractions, especially when dealing with APIs. Using a facade around a granular API
* can create an easier interface. The level of abstraction at which the API works can be raised so that
* it is more in sync with how your application works.
*
 */