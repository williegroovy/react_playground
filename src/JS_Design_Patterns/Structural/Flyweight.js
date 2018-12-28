/*
* Flyweight Pattern - used in instances where there are a large number of instances of objects which
*   vary only slightly. Large meaning >= 10,000 but in some instances expensive objects could change that number.
*
* In some cases, the object may be so expensive that only a handful are required before overloading the system.
* In this case flyweight at a smaller number makes sense. Maintaining a full object for each object consumes
* a ton of memory, most of which is consumed wastefully. (Most instances having same values)
*
* Flyweight offers a way to compress this data by only keeping track of the values that differ
* from some prototype in each instance.
*
* JavaScripts prototype model is ideal for this scenario. We can assign the most common value to the prototype
* and each individual instances can override them as needed.
*
 */

const Solider = (function() {
  function Solider() {}

  // Allows for shared values across a potentially large number of instances
  Solider.prototype.Health = 10;
  Solider.prototype.FightAbility = 5;
  Solider.prototype.Hunger = 1;

  return Solider;
})();

const solider1 = new Solider();
const solider2 = new Solider();

solider2.Health = 21;
solider2.Hunger = 20;

console.log(`Solider1 Health ${solider1.Health} Fight Ability: ${solider1.FightAbility} Hunger: ${solider1.Hunger}`);
console.log(`Solider2 Health ${solider2.Health} Fight Ability: ${solider2.FightAbility} Hunger: ${solider2.Hunger}`);