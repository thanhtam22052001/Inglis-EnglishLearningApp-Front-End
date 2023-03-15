export const shuffleArray = array => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const getAnswers = (data, word) => {
  let ans = data
    .filter(e => e.word !== word)
    .slice(0, 3)
    .map(a => a.word);
  ans.push(word);
  return shuffleArray(ans);
};

export const WORD_TYPES = {
  n: 'danh từ',
  adj: 'tính từ',
  adv: 'trạng từ',
  v: 'động từ',
};

export const getAnswerSentences = (answers, data) => {
  return answers.map(answer => {
    let dataWord = data.find(item => item.word === answer);
    if (dataWord)
      return (
        dataWord.definition.charAt(0).toUpperCase() +
        dataWord.definition.slice(1) +
        '.'
      );
  });
};
