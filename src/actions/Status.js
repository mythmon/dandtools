import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as dice from '../dice';


export function addCreature({name, maxHP, currentHP, hitDice}) {
  if (maxHP && hitDice) {
    throw "Invalid: Can't set both maxHP and hitDice";
  }
  if (name === undefined) {
    throw 'Invalid: name is required.';
  }

  if (hitDice) {
    // First roll is always max.
    let diceSpec = dice.parse(hitDice);
    diceSpec.count -= 1;
    diceSpec.add += diceSpec.dieSize;
    maxHP = dice.roll(diceSpec);
  }

  if (maxHP === undefined) {
    throw 'Invalid: one of maxHP or hitDice is required.';
  }

  if (currentHP === undefined) {
    currentHP = maxHP;
  }

  AppDispatcher.dispatch({
    type: ActionTypes.ADD_CREATURE,
    name: name,
    maxHP: maxHP,
    currentHP: currentHP,
  });
}
