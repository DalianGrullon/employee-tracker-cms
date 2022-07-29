function getMethod(choice) {
  let method = choice.toLowerCase().split(' ');

  for (let i = 1; i < method.length; i++) {
    method[i] = method[i].substring(0, 1).toUpperCase() + method[i].substring(1, method[i].length);
  }
  
  return method.join('') + '()';
}

module.exports = getMethod;