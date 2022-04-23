"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortWords = exports.reverseWords = void 0;
var REGX_PUNCTUATION = new RegExp('[.!?",\/#$%\^&\*;:{}=_`~()]');
/**
 * @name reverseWord
 * @description reverse a word
 * @param { string } word
 * @return { string }
 */
function reverseWord(word) {
    return word.split('').reverse().join('');
}
/**
 * @name sortWord
 * @description sort a word
 * @param { string } word
 * @return { string }
 */
function sortWord(word) {
    return word.split('')
        .sort(function (x, y) {
        x = x.toLowerCase();
        y = y.toLowerCase();
        return x > y ? 1 : (x < y ? -1 : 0);
    })
        .join('');
}
/**
 * @name reverseWords
 * @description reverse a sentence
 * @param { string } sentence
 * @return { string }
 */
function reverseWords(sentence) {
    // if there are more than one words, split and process each word.
    if (sentence.includes(' '))
        return sentence.split(' ').map(function (token) { return reverseWords(token); }).join(' ');
    // if the the word begins with an apostrophes, then process the following characters.
    if (sentence[0] === "'")
        return sentence[0] + reverseWords(sentence.substr(1));
    // process with punctuations
    var match = sentence.match(REGX_PUNCTUATION);
    if (!match)
        return reverseWord(sentence);
    return reverseWords(sentence.substr(0, match.index)) + sentence[match.index] + reverseWords(sentence.substr(match.index + 1));
}
exports.reverseWords = reverseWords;
/**
 * @name sortWords
 * @description sorts a sentence
 * @param { string } sentence
 * @return { string }
 */
function sortWords(sentence) {
    // if there are more than one words, split and process each word.
    if (sentence.includes(' '))
        return sentence.split(' ').map(function (token) { return sortWords(token); }).join(' ');
    // process with punctuations
    var match = sentence.match(REGX_PUNCTUATION);
    if (!match)
        return sortWord(sentence);
    return sortWord(sentence.substr(0, match.index)) + sentence[match.index] + sortWords(sentence.substr(match.index + 1));
}
exports.sortWords = sortWords;
