const sayHi = (role) => console.info(`Hi, iam a ${role}`);

function sayHello(role) {
  return `Hello, i am ${role}`;
}

const person = {
  name: "Rifki Muhazzar",
  age: 22,
  job: "Frontend Developer",
  person() {
    return `Hi, my name is ${this.name}, my age is ${this.age} and i am a ${this.job}`;
  },
};

const fullName = "Rifki Muhazzar";

class MyClass {
  constructor() {
    console.info("This is MyClass");
  }
}

module.exports = { sayHi, sayHello, person, fullName, MyClass };

// module.exports = {
//   f1: sayHi,
//   f2: sayHello,
//   person: person,
//   fullName: fullName,
//   MyClass: MyClass,
// };

// module.exports.f1 = sayHi;
// module.exports.f2 = sayHello;
// module.exports.person = person;
// module.exports.fullName = fullName;
// module.exports.MyClass = MyClass;
