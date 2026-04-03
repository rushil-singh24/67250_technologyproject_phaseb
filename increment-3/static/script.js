var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function sumPrint(x1, x2) {
  console.log(x1 + x2);
}

sumPrint(x, y);
sumPrint(A, B);

if (C.length > z) {
  console.log(C);
} else if (C.length < z) {
  console.log(z);
} else {
  console.log("good job!");
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "Banana") {
      alert("Banana found!");
    }
  }
}

// findTheBanana(L1);
// findTheBanana(L2);

function findTheBananaForEach(arr) {
  arr.forEach(function(item) {
    if (item === "Banana") {
      alert("Banana found!");
    }
  });
}

function greeting(hour) {
  var greetingElement = document.getElementById("greeting");

  if (greetingElement) {
    if (hour < 5 || hour >= 20) {
      greetingElement.innerHTML = "Good night, welcome to MonoMuse";
    } else if (hour < 12) {
      greetingElement.innerHTML = "Good morning, welcome to MonoMuse";
    } else if (hour < 18) {
      greetingElement.innerHTML = "Good afternoon, welcome to MonoMuse";
    } else {
      greetingElement.innerHTML = "Good evening, welcome to MonoMuse";
    }
  }
}

function addYear() {
  var yearElement = document.getElementById("copyYear");

  if (yearElement) {
    yearElement.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}

var now = new Date();
var hour = now.getHours();
greeting(hour);
