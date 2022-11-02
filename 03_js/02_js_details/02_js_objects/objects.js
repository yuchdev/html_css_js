// JS Object examples
let person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

// 2 ways of accessing object properties
console.log(person.firstName);
console.log(person["lastName"]);

// Adding new properties
person.nationality = "English";

// Deleting properties
delete person.age;

// Looping through object properties
for (let x in person) {
    console.log(x);
}

// Object methods
let person2 = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
}

// Accessing object methods
console.log(person2.fullName());

// Keyword "this" refers to the object itself
let person3 = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
}

// Accessing object methods
console.log(person3.fullName());

// Strict mode and "this"
"use strict";
function myFunction() {
    return this; // in strict mode, this returns undefined
}

// Pre-defined methods

// Method apply()
let person5 = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
let person6 = {
    firstName:"Mary",
    lastName: "Doe"
}
person5.fullName.apply(person6);  // Will return "Mary Doe"

// Method bind()
let person7 = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
let person8 = {
    firstName:"Mary",
    lastName: "Doe"
}
let x = person7.fullName.bind(person8); // Will not return "Mary Doe"

// Method call()
let person9 = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
let person10 = {
    firstName:"John",
    lastName: "Doe"
}
person9.fullName.call(person10, "Oslo", "Norway"); // Will return "John Doe,Oslo,Norway"

// Method toString()
let person11 = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566
};
person11.toString(); // Will return "[object Object]"

// Comparing objects
let person12 = {
    firstName: "John",
    lastName : "Doe",
    age      : 50,
    eyeColor : "blue"
}
let person13 = {
    firstName: "John",
    lastName : "Doe",
    age      : 50,
    eyeColor : "blue"
}
let eq = (person12 === person13); // Will return false, because they are not the same object
console.log(eq);

// Class declaration
class Car1 {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

// Class expression
let Car2 = class {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

// Creating an object from a class
let myCar1 = new Car1("Ford", 2014);
let myCar2 = new Car1("Audi", 2019);
console.log(myCar1.name);
console.log(myCar2.name);

// Extending classes
class Model extends Car1 {
    constructor(name, year, model) {
        super(name, year);
        this.model = model;
    }
}

// Getters and setters
class Car3 {
    constructor(brand) {
        this.carname = brand;
    }
    get cnam() {
        return this.carname;
    }
    set cnam(x) {
        this.carname = x;
    }
}

// Static methods
class Car {
    constructor(brand) {
        this.carname = brand;
    }
    static hello() {
        return "Hello, this is a static method!";
    }
}

// Calling a static method
Car.hello();
