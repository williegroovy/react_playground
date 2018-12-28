/*
* Proxy Pattern - provides a method of controlling the creation and use of expensive objects.
*
* The proxy will mirror the interface of the actual instance. It is substituted in for the
* instance in all the clients and, typically, wraps a private instance of the class.
*
* Places for use:
*  - Lazy instantiation of an expensive object.
*  - Protection of secret data.
*  - Stubbing for remote method invocation.
*  - Interposing additional actions before or after method invocation.
*
* Often an object is expensive to instantiate and we don't want to have instances created
* before they are actually needed. In this case proxy can check its internal instance and, if not
* yet instantiated, create it before passing on the method call. "Lazy instantiation"
*
* If a class has been designed without any security in mind but now requires some, this can
* be provided through the use of a proxy. The proxy will call and only pass on the method call
* in cases where the security checks out.
*
* The proxy may be used to simply provide an interface to methods that are invoked somewhere else.
* In fact, this is exactly how a number of web socket libraries function, proxying calls back to the web server.
*
* Finally, there may be cases where it is useful to interpose some functionality into the method invocation.
* This could be logging of parameters, validating of parameters, altering results, or any number of things.
*
 */

/*
* *** --> Diagram <-- ***
*
*               [IExpensiveClass]
*                       |
*          -----------------------------
*         |                             |
*         |                             |
*         |                             |
* [ProxyExpensiveClass]        [ActualExpensiveClass]
*
*/

class BarrelCalculator {
  calculateNumberNeeded(volume) {
    return Math.ceil(volume / 157);
  }
}

class DragonBarrelCalculator {
  calculateNumberNeeded(volume) {
    if(this._barrelCalculator == null) {
      this._barrelCalculator = new BarrelCalculator();
    }
    return this._barrelCalculator.calculateNumberNeeded(volume * 7);
  }
}

class PintBarrelCalculator {
  calculateNumberNeeded(volume) {
    if(PintUnit.prototype === Object.getPrototypeOf(volume)) {
      //thorw some sort of error or compensate
    }

    if(this._barrelCalculator == null) {
      this._barrelCalculator = new BarrelCalculator();
      return this._barrelCalculator.calculateNumberNeeded(volume * 1.2);
    }
  }
}

// Or we could try and protect against accidentally using the wrong calculator and use a unit property.
class PintUnit {
  constructor(unit, quantity) {
    this.quantity = quantity;
  }
}