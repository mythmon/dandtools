import {randInt} from './utils';

export function parse(spec) {
  let parts = /^(\d+)?d(\d+)([+-](\d+))?/.exec(spec);
  let [_, count, dieSize, add] = parts.map((s) => parseInt(s));
  if (isNaN(count)) {
    count = 1;
  }
  if (isNaN(add)) {
    add = 0;
  }
  return {count, dieSize, add};
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
