// utils.js
export function countUniqueWords(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const wordFreq = {};
  let uniqueCount = 0;

  words.forEach(function (word) {
    if (!wordFreq[word]) {
      wordFreq[word] = 0;
    }
    wordFreq[word]++;
  });

  for (const word in wordFreq) {
    if (wordFreq[word] === 1) {
      uniqueCount++;
    } else {
      uniqueCount += 1;
    }
  }

  return uniqueCount;
}
export function removeArabicHarakat(text) {
  return text.replace(/[\u0617-\u061A\u064B-\u0652\u0657-\u065F]/g, "");
}
