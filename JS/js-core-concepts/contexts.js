console.log('Initial this (global object)', this, '{]'); // {}
this.example = 'a';
console.log('Adding example propertie to global object: ', this); // { example: 'a' }

function namedFunction() {
  console.log('this inside named function (a function scoped  context)', this);
  this.a = 'a';
  console.log(this); // Object [global] & { a: 'b' }
}

const arrowFunction = () => {
  console.log('called f2');
  console.log('this:', this);
  this.changeThis = "I'm changing the global object";
};

namedFunction(); // A complex object with a lot of properties and methods (global object) is displayed.
console.log(
  'this was not affected in the namedFunciton block code, because the  "this" inside named function is a function scoped context.',
  this
);

arrowFunction(); // Only the global object is displayed.

console.log(
  'this after f2:',
  this,
  " -- The global this was changed because in arrow function 'this' is not binded to the function, it's binded to the global object"
);
