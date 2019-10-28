/*
* Functional Programming - Getting Started
*
*   -> Functions <-
*
*     # Simple:
*       function double(x) {
*         return x * 2;
*       }
*
*     # Arrow: const double = x => x * 2;
*
*     Almost every language has some kind of support for functions.
*     Some languages make them first-class constructs by allowing them to be used in the same way as other values.
*
*       - refer to them from constants and variables
*       - pass them as parameters to other function
*       - return them as results from other functions
*
*
*   -> Pure Functions <-
*
*     Functional programming relies on mostly working with "pure" functions.
*
*     Pure functions have "no side-effects" because they:
*       - don't assign to any outside variables
*       - don't consume input
*       - don't produce output
*       - don't read from or write to a database
*       - don't modify parameters they are passed
*
*     A "pure" functional will always return the same result given the same input.
*     Impure functions are a necessity in programming for anything interesting to happen.
*     The focus of functional programming is keeping as many functions pure as possible.
*
*
*   -> Immutability <-
*
*     Immutability means unchangeable.
*
*     Working in an immutable fashion is never changing a value or object once initialized.
*     If an array or object needs to be changed a copy with the changed value is returned.
*
*     Immutability goes hand-in-hand with pure functions since they have no side-effects, and are not
*     able to change outside data structures. They are forced to work in an immutable way.
*
*
*   -> Where to Start <-
*
*     To get started quickly being with replacing loops with collection-iteration functions.
*
*     { In javascript these (with the exception of reject) are on "Array.prototype" }
*
*
*     - forEach -
*
*     // replace this:
*       for (cont value of myArray) {
*         console.log(value)
*       }
*
*     // with array.prototype
*       myArray.forEach(value => console.log(value))
*
*     // or with ramda:
*       forEach(value => console.log(value), myArray)
*
*     "forEach" takes a function and an array, then calls the function on each element of the array.
*
*     While "forEach" is the most approachable of these functions it gets used the least.
*     Since it doesn't return a value it's only used in functions that have side-effects.
*
*
*   - map -
*
*     Map applies a function to each element of an array and applies the results to a new array and returns it.
*
*     const myArray = [1, 2, 3];
*     const double = curr => curr * 2
*
*     // array.prototype
*     myArray.map(double) --> [2, 4, 6]
*
*     // ramda:
*     map(double, myArray) --> [2, 4, 6]
*
*
*   - filter/reject -
*
*     Filter selects elements from an array based on some function.
*     It applies its function to each element of the array.
*
*     Whenever the function returns a "truthy" value, the corresponding element is included in the result.
*     Whenever the function returns a "falsy" value, the corresponding element is excluded from the result.
*
*
*     const myArray = [1, 2, 3, 4];
*     const isEven = curr => curr % 2 === 0;
*
*     // array.prototype
*     myArray.filter(isEven) --> [2, 4]
*
*     // ramda:
*     filter(isEven, myArray) --> [2, 4]
*
*     Reject does the same as filter but in reverse.
*     It keeps elements for which the function returns a falsy value and
*     excludes the elements for which it returns a truthy value.
*
*     // ramda:
*     reject(isEven, myArray) --> [1, 3]
*
*
*   - find -
*
*     Find applies a function to each element of an array and returns the first element which
*     the function returns a truthy value.
*
*     const myArray = [1, 2, 3, 4];
*     const isEven = curr => curr % 2 === 0;
*
*     // array.prototype
*     myArray.find(isEven) --> 2
*
*     // ramda:
*     find(isEven, myArray) --> 2
*
*
*   - reduce -
*
*     Reduce takes a two argument function, an initial value, and the array on which to operate.
*
*     The first argument passed to the function is called the "accumulator" and
*     the second argument is the value from the array. The function must return a new "accumulator"
*
*     const myArray = [1, `2`, 3, 4];
*     const add = (accum, value) => accum + value;
*
*     // array.prototype
*     myArray.reduce(add, 5) --> 15
*
*     // ramda:
*     reduce(add, 5, myArray) --> 15
*
*     1. "reduce" calls "add" with the initial value "5" and the first element of the array "1",
*       and then "add" returns a new accumulator value "5 + 1 = 6"
*
*     2. "reduce" calls "add" again with the new accumulator value "6" and the next element
*       of the array "2", returning "8".
*
*     3. "reduce" calls "add" again with "8" and the next value "3" returning "8".
*
*     4. "reduce" calls "add" a final time with "11" and the last value of the array "4",
*       resulting in "15".
*
*     5. "reduce" returns the final accumulated value as its result "15".
*
*/
