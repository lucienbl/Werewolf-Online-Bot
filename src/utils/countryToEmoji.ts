function letterToLetterEmoji(letter) {
  return String.fromCodePoint(letter.toLowerCase().charCodeAt() + 127365);
}
export default function countryToFlagEmoji(str) {
  return Array.from(str).map(letterToLetterEmoji).join('');
}
