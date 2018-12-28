/*
* Composite Pattern - a special case of coupling in which the composite is treated as interchangeable
* with the components.
*
*  Components can be built from a fixed number of a variety of components, or from a collection of any length.
*  In both cases the components contained within the parent composition could be of the same type as the composition.
*  So a composition may contain instances of its own type.
*
*  A key feature of the composite pattern is the interchangeability of a component with its children.
*
*  If we have a composite which implements IComponent, then all of the components of the
*  composite will also implement IComponent.
*
*  Going back to the round peg / square hole... each adapter fills in the missing bits to help us get a good fit.
 */

/*
* *** --> Diagram <-- ***
*
*                   [Composite]
*                   |   |     |
*      ------------     |      ------------
*      |                |                 |
*      |                |                 |
*      |                |                 |
* [Component1]     [Component2]      [Component3]
*
*                   [Composite]
*                       |
*                       |
*                       |
*    [[Component1],[Component2],[Component3]] *Stacked 1 -> 2 -> 3
*
*/

const SimpleIngredient = (function() {
  function SimpleIngredient(name, calories, ironContent, vitaminCContent) {
    this.name = name;
    this.calories = calories;
    this.ironContent = ironContent;
    this.vitaminCContent = vitaminCContent;
  }

  SimpleIngredient.prototype = {
    getName: function() { return this.name; },
    getCalories: function() { return this.calories; },
    getIronContent: function() { return this.ironContent; },
    getVitaminCContent: function() { return this.vitaminCContent; }
  };

  return SimpleIngredient;
})();

class CompoundIngredient {
  constructor(name) {
    this.name = name;
    this.ingredients = [];
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  getName() {
    return this.name;
  }

  getCalories() {
    return this.ingredients.reduce((accum, curr) => accum + curr.calories, 0);
  }

  getIronContent() {
    return this.ingredients.reduce((accum, curr) => accum + curr.ironContent, 0);
  }

  getVitaminCContent() {
    return this.ingredients.reduce((accum, curr) => accum + curr.vitaminCContent, 0);
  }
}

const egg = new SimpleIngredient("Egg", 155, 6, 0);
const milk = new SimpleIngredient("Milk", 42, 0, 0);
const sugar = new SimpleIngredient("Sugar", 387, 0, 0);
const rice = new SimpleIngredient("Rice", 370, 8, 0);

const ricePudding = new CompoundIngredient("Rice Pudding");
ricePudding.addIngredient(egg);
ricePudding.addIngredient(rice);
ricePudding.addIngredient(milk);
ricePudding.addIngredient(sugar);

console.log(`
  A serving of ${milk.getName()} contains: 
  ${milk.getCalories()} calories,
  ${milk.getIronContent()} iron, and
  ${milk.getVitaminCContent()} vitamin c.
`);

console.log(`
  A serving of ${ricePudding.getName()} contains: 
  ${ricePudding.getCalories()} calories,
  ${ricePudding.getIronContent()} iron, and
  ${ricePudding.getVitaminCContent()} vitamin c.
`);

/*
* This example could continue with Rice Pudding being an ingredient in another dish or any combination.
*
* Composite is a heavily used pattern in JavaScript code that deals with HTML elements,
* as they are a tree structure. For example, the jQuery library provides a common interface
* if you have selected a single element or a collection of elements. When a function is called it
* is actually called on all the children, for instance:
*
*   $("a").hide()
*
* This will hide all the links on a page regardless of how many elements are actually
* found by calling $("a"). The composite is a very useful pattern for JavaScript development.
 */