const { fetchData } = require("../sample/sum");

// Equality
// expect(…).toBe();
// expect(…).toEqual();
// // Truthiness
// expect(…).toBeDefined();
// expect(…).toBeNull();
// expect(…).toBeTruthy();
// expect(…).toBeFalsy();
// // Numbers
// expect(…).toBeGreaterThan();
// expect(…).toBeGreaterThanOrEqual();
// expect(…).toBeLessThan();
// expect(…).toBeLessThanOrEqual();
// // Strings
// expect(…).toMatch(/regularExp/);
// // Arrays
// expect(…).toContain();
// // Objects
// expect(…).toBe(); // check for the equality of object references
// expect(…).toEqual(); // check for the equality of properties
// expect(…).toMatchObject();
// // Exceptions
// expect(() => { someCode }).toThrow();

// test starts here

// //sum test  = add two numbers
// test("adds two number", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// //object test = equal to
// test("object assignment", () => {
//   const data = { one: 1 };
//   data["two"] = 2;
//   expect(data).toEqual({ one: 1, two: 2 });
// });

// //positive number test = not equal to
// test("adding positive numbers is not zero", () => {
//   for (let a = 1; a < 10; a++) {
//     for (let b = 1; b < 10; b++) {
//       expect(a + b).not.toBe(0);
//     }
//   }
// });

//testing asynchronous code
// test("the data is email", (done) => {
//   function callback(data) {
//     try {
//       expect(data).toBe("email");
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }
//   fetchData(callback);
// });

//promises
// test("the data is peanut butter", () => {
//   return fetchData().then((data) => {
//     expect(data).toBe("peanut butter");
//   });
// });

//resolves
// test("the data is peanut butter", () => {
//   return expect(fetchData()).resolves.toBe("peanut butter");
// });

// //async await
// test("the data is peanut butter", async () => {
//   const data = await fetchData();
//   expect(data).toBe("peanut butter");
// });

// test("the fetch fails with an error", async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch("error");
//   }
// });
