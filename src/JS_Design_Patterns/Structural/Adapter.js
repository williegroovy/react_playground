/*
* Adapter Pattern is a thin piece of code that implements a required interface.
*  - It typically wraps a private copy of the implementation class and proxy calls through to it.
*
* The Adapter patterns is the equivalent of putting a round peg into a square hole.
* - Yes it will fit, however there are corners that are not filled in.
*   The adapter is fills in the corners and makes the square hole complete.
*
* In software similar approaches are often needed when we want to use a class that does not
* perfectly fit the required interface. (Think 3rd party code).
*
* The class may be missing methods or have additional methods that should be hidden.
* The adapter can help a class comply with an interface.
*
* Normally a refactor of a class can be performed to match an interface, but sometimes
* there are situations that call for a thin wrapper that changes the abstraction level of the code.
 */

/*
* *** --> Diagram <-- ***
*
*   [DesiredInterface] (-DoABandC | -memberName)
*         |
*         |
*         |
*     [Adapter] (-DoABandCCCC | -memberName)
*         |
*         |
*         |
*  [Implementation] (-DoAB | -DoCCCCC)
*
*
*
* interface Ship {
*   SetRudderAngleTo(angle: number);
*   SetSailConfiguration(configuration: SailConfiguration);
*   SetSailAngle(sailId: number, sailAngle: number);
*   GetCurrentBearing() : number;
*   GetCurrentSpeedEstimate(): number;
*   ShiftCrewWeightTo(weightToShift: number, locationId: number);
* }
*
*
* We need a much simpler interface that abstracts away the extra bits for something like:
*
* interface SimpleShip {
*   TurnLeft();
*   TurnRight();
*   GoForward();
* }
*
* The second interface is simple to understand regardless of 'ship' knowledge.
* The idea is to create a higher-level abstraction around the ship.
*
* To transform Ship into a SimpleShip we need an adapter;
*/

const Ship = (function() {
  function Ship() {
    this.bearing = 0;
    this.speed = 0;
    this.crewWeightAmount = '100%';
    this.crewWeightLocation = 'front'
  }

  Ship.prototype.log = function(msg) {
    console.log(`Ship: ${msg}`);
  };

  Ship.prototype.setRudderAngleTo = function(angle) {
    this.log(`Setting rudder angle to ${angle}`)
  };

  Ship.prototype.setSailConfigurationfunction = function(configuration) {
    this.log(`Setting sail configuration to ${configuration}`)
  };

  Ship.prototype.setSailAngle = function(sailId, sailAngle){
    this.log(`Setting sail ${sailId} to ${sailAngle} degrees`)
  };

  Ship.prototype.getCurrentBearing = function() {
    return this.bearing;
  };

  Ship.prototype.getCurrentSpeedEstimate = function() {
    return this.speed;
  };

  Ship.prototype.shiftCrewWeightTo = function(weightToShift, locationId) {
    this.crewWeightAmount = weightToShift;
    this.crewWeightLocation = locationId;
  };

  return Ship;
})();

const ShipAdapter = (function() {
  function ShipAdapter() {
    this._ship = new Ship();
  }

  ShipAdapter.prototype.turnLeft = function() {
    this._ship.setRudderAngleTo(-30);
    this._ship.setSailAngle(3, 12);
  };

  ShipAdapter.prototype.turnRight = function() {
    this._ship.setRudderAngleTo(30);
    this._ship.setSailAngle(5, -9);
  };

  ShipAdapter.prototype.goForward = function() {
    // make it go forward;
  };

  return ShipAdapter;
})();

const ship = new ShipAdapter();
ship.goForward();
ship.turnLeft();

/*
* The functions for a ship would be far more complex in reality, but the nice interface
* up the presentation for the rest of the world.
*
* Adapters can grow to be complex while adjusting one interface to another.
* In order to avoid overly complex adapters, care must be taken.
*
* Use the single responsibility principle. It is not inconceivable to build several
* adapters, on atop another. Complex adapters can be replaced with a composite object.
*
* For Testing purposes Adapters can be used to totally wrap third party dependencies.
* They provide us a place to hook-in tests. Unit tests should not test third party libraries, but
* they should test adapters to ensure they are proxying calls correctly.
*
* By wrapping libraries in adapters, we can limit the number of places of interaction with the libraries directly.
* This means the libraries can be easily replaced.
*
* The adapter pattern can be slightly modified to provide consistent interfaces over a number of different
* implementations. This is usually known as the bridge pattern.
 */
