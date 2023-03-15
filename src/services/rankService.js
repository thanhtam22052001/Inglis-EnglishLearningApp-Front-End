export const getRank = level => {
  switch (level) {
    case 'A0':
      return require('../assets/images/ranks/A0.png');
    case 'A1':
      return require('../assets/images/ranks/A1.png');
    case 'A2':
      return require('../assets/images/ranks/A2.png');
    case 'B1':
      return require('../assets/images/ranks/B1.png');
    case 'B2':
      return require('../assets/images/ranks/B2.png');
    case 'C1':
      return require('../assets/images/ranks/C1.png');
    case 'C2':
      return require('../assets/images/ranks/C2.png');
  }
};
export const calculateRank = correct => {
  if (correct < 10) {
    return 'A0';
  } else if (correct < 30) {
    return 'A1';
  } else if (correct >= 30 && correct < 50) {
    return 'A2';
  } else if (correct >= 50 && correct < 60) {
    return 'B1';
  } else if (correct >= 60 && correct < 80) {
    return 'B2';
  } else if (correct >= 80 && correct < 90) {
    return 'C1';
  } else {
    return 'C2';
  }
};
