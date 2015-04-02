import {randInt} from './utils';

const diceSpecRe = /^(\d+)?d(\d+)([+-](\d+))?$/;

export function parse(spec) {
  let parts = spec.match(diceSpecRe);
  let [count, dieSize, add] = parts.slice(1).map((s) => parseInt(s));
  if (isNaN(count)) {
    count = 1;
  }
  if (isNaN(add)) {
    add = 0;
  }
  return {count, dieSize, add};
}

export function isValid(spec) {
  return spec.match(diceSpecRe) !== null;
}

export function roll(spec) {
  if (typeof spec === 'string') {
    spec = parse(spec);
  }
  let acc = spec.add;
  for (let i = 0; i < spec.count; i++) {
    acc += randInt(1, spec.dieSize);
  }
  return acc;
}
