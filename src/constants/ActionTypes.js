function symbolMaker(keys) {
  let symbols = {};
  for (var key of keys) {
    symbols[key] = Symbol(key);
  }
  return symbols;
}

const ActionTypes = symbolMaker([
  'ADD_CREATURE',
]);

export default ActionTypes;
