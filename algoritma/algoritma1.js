function reverseWord(str) {
  let huruf = str.match(/[a-zA-Z]/g);
  let angka = str.match(/\d+/);
  let reverseHuruf = huruf.reverse().join("");
  let result = reverseHuruf + (angka ? angka[0] : "");
  return result;
}
let string = "NEGIE1";
let hasil = reverseWord(string);
console.log(hasil);
