/*
* Decorator Pattern - used to wrap and augment an existing class.
*
* This pattern is used as an alternative to subclassing an existing component.
* Subclassing is a compile time operation and is a tight coupling. Once subclassing is performed,
* there is no way to alter it at runtime. In cases where there are many possible subclasses possible
* that can act in combination, the number of combinations of subclassing explodes.
*
*
 */

/*
* *** --> Diagram <-- ***
*
*  (Interface)
* [IBaseClass] -----------------------------
*      |                 |                  |
*      |                 |                  |
*      |                 |                  |
*  [BaseClass]       [Decorator1]      [Decorator2]
*      |                                    |
*      |                                    |
*      |                                    |
*       ------------------------------------
*
*/

class BasicArmor {
  calculateDamageFromHit(hit) {
    return hit.strength * .2;
  }

  getArmorIntegrity() {
    return 1;
  }
}

const ChainMail = (function() {
  function ChainMail(decoratedArmor) {
    this.decoratedArmor = decoratedArmor;
  }

  ChainMail.prototype.calculateDamageFromHit = function(hit) {
    hit.strength = hit.strength * .8;
    return this.decoratedArmor.calculateDamageFromHit(hit);
  };

  ChainMail.prototype.getArmorIntegrity = function() {
    return .9 * this.decoratedArmor.getArmorIntegrity();
  };

  return ChainMail
})();

const Westeros = {
  Armor: {
    BasicArmor: BasicArmor,
    ChainMail: ChainMail
  }
};

const armor = new Westeros.Armor.ChainMail(new Westeros.Armor.BasicArmor);
console.log(armor.calculateDamageFromHit({location: "head", weapon: "Sock filled with pennies", strength: 12}));

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