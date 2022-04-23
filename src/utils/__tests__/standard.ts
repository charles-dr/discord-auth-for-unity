import {
  reverseWords,
  sortWords,
} from '../starndard';

type TestResultItem = {
  src: string;
  dest: string;
}

describe('reverse-words', () => {
  it('should return the reversed words', () => {
    const testCases: Array<TestResultItem> = [
      {
        src: "He asked me, 'How are you?'",
        dest: "eH deksa em, 'woH era uoy?'",
      },
      {
        src: 'The sentance "Hello World!" is often used in programming examples?',
        dest: 'ehT ecnatnes "olleH dlroW!" si netfo desu ni gnimmargorp selpmaxe?',
      },
    ];
    testCases.forEach(({ src, dest }) => {
      const reversed = reverseWords(src);
      expect(reversed).toEqual(dest);
    });
  });
});

describe('sort-words', () => {
  it('should return the sorted words', () => {
    const testCases: Array<TestResultItem> = [
      {
        src: "He asked me, 'How are you?'",
        dest: "eH adeks em, 'How aer ouy?'",
      },
      {
        src: "LX's head office is located in Sydney, Australia.",
        dest: "'LsX adeh ceffio is acdelot in denSyy, Aaailrstu."
      },
    ];
    testCases.forEach(({ src, dest }) => {
      const sorted = sortWords(src);
      expect(sorted).toEqual(dest);
    });
  });
});
