"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var starndard_1 = require("../starndard");
describe('reverse-words', function () {
    it('should return the reversed words', function () {
        var testCases = [
            {
                src: "He asked me, 'How are you?'",
                dest: "eH deksa em, 'woH era uoy?'",
            },
            {
                src: 'The sentance "Hello World!" is often used in programming examples?',
                dest: 'ehT ecnatnes "olleH dlroW!" si netfo desu ni gnimmargorp selpmaxe?',
            },
        ];
        testCases.forEach(function (_a) {
            var src = _a.src, dest = _a.dest;
            var reversed = (0, starndard_1.reverseWords)(src);
            expect(reversed).toEqual(dest);
        });
    });
});
describe('sort-words', function () {
    it('should return the sorted words', function () {
        var testCases = [
            {
                src: "He asked me, 'How are you?'",
                dest: "eH adeks em, 'How aer ouy?'",
            },
            {
                src: "LX's head office is located in Sydney, Australia.",
                dest: "'LsX adeh ceffio is acdelot in denSyy, Aaailrstu."
            },
        ];
        testCases.forEach(function (_a) {
            var src = _a.src, dest = _a.dest;
            var sorted = (0, starndard_1.sortWords)(src);
            expect(sorted).toEqual(dest);
        });
    });
});
