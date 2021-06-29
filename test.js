console.log("Antes");
setTimeout(function () {
  console.log("Durante");
}, Math.floor(Math.random() * 3000 + 1000));
console.log("Depois");

while (Date.now() < start + 3000) {}