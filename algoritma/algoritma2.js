function findLongestWord(str) {
  const words = str.split(" ");
  let longestWord = words[0];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return { word: longestWord, length: longestWord.length };
}
const sentence = "Saya sangat senang mengerjakan soal algoritma";
const result = findLongestWord(sentence);
console.log(`${result.word}: ${result.length} character`);
