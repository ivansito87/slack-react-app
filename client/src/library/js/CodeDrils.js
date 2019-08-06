const tests = [
		`\nfunction add(a, b){
  return a + b;
}

console.log( add(2,3) ); 
`,
		`\nvar greet = function() {
  return 'Haydo!';
};

var salutation = greet();`,
		`\nvar shout = function(word) {
  var result = word + word;
  console.log(result);
  return result;
};
`,
		`\nvar firstChar = function(text) {
  var trimmedText = text.trim();
  return trimmedText.charAt(0);
};
`,
		`var indexOfIgnoreCase = function(s1, s2) {
    var s1Lower = s1.toLowerCase();
    var s2Lower = s2.toLowerCase();
    return s1Lower.indexOf(s2Lower);
};
`,
		`function reverseArray(array) {
  var reversedArray = [];

  array.forEach(function(value, index, arr) {
        reversedArray.unshift(value);
  });
  
  return reversedArray;
}`,
		`const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(\`Example app listening on port 3000!\`));`,
		`const add = function(int) {
  let sum = 0;
  for(let i = 0; i<= int; i++) {
    sum += i;
  }
  console.log(sum);
}
add(10);`,
	`function findMax (arr) {
  let max = null;
  for (let i = 0; i < arr.length; i++) {
    if (max === null || max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}`
];

export default tests;