import React from 'react';

import BaseSection from './BaseSection';
import * as StatusActions from '../actions/Status';


export default class AddCreature extends BaseSection {
  constructor(props) {
    super(props, {
      name: '',
      hp: '1d10',
    });
    this.title = 'Add Creature';
    this.className = 'AddCreature';
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  submit() {
    var opts = {
      name: this.state.name,
      maxHP: parseInt(this.state.name),
    };

    if (isNaN(opts.maxHP)) {
      opts.maxHP = undefined;
      opts.hitDice = this.state.hp;
    }

    StatusActions.addCreature(opts);
  }

  renderBody() {
    return (
      <div>
        <div className="row">
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
        </div>

        <div className="row">
          <label>HP</label>
          <input type="text" name="hp" value={this.state.hp} onChange={this.handleChange.bind(this)}/>
        </div>

        <div className="row">
          <button onClick={this.submit.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}
