module.exports = function check(str, bracketsConfig) {
  let checkline = [];


  let matchChecker;
  let counter;
  let openingBrackets = [];
  let closingBrackets = [];
  let sameBrackets = [];

  bracketsConfig.forEach(element => {
    if (element[0] === element[1]) {
      sameBrackets.push(element[0]);
    }
    openingBrackets.push(element[0]);
    closingBrackets.push(element[1]);
  });

  const sameBracketsCounter = sameBrackets.map(element => {
    const container = {};
    container.name = element;
    container.count = 0;
    return container;
  });


  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (closingBrackets.indexOf(char) > -1) {

      matchChecker = openingBrackets[closingBrackets.indexOf(char)];

      if (matchChecker === char) {
        counter = sameBracketsCounter.find((el) => el.name === char);
        if (counter.count % 2) {
          counter.count++;
          if (checkline.length == 0 || (checkline.pop() != matchChecker)) {
            return false;
          }
        } else {
          checkline.push(char);
          counter.count++;
        }
      } else {
        if (checkline.length == 0 || (checkline.pop() != matchChecker)) {
          return false;
        }
      }
    } else {
      checkline.push(char);
    }
  };

  return (checkline.length == 0);
};