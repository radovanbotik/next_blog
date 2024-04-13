const url = "http://localhost:1337/api/articles?populate=*";
const response = await fetch(url);
const data = await response.json();
// console.log(JSON.stringify(data, null, 2));
console.log(data);
