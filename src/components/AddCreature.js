import React from 'react';

import * as StatusActions from '../actions/Status';


export default class AddCreature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hp: '1d10',
    };
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

  render() {
    return (
      <div className="Section AddCreature">
        <div className="Section__title">
          Add Creature
          <button className="Section__close small" onClick={() => this.props.remove(this)}>X</button>
        </div>

        <div className="Section__body">
          <row>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
          </row>
          <row>
            <label>HP</label>
            <input type="text" name="hp" value={this.state.hp} onChange={this.handleChange.bind(this)}/>
          </row>
          <row>
            <button onClick={this.submit.bind(this)}>Add</button>
          </row>
        </div>
      </div>
    );
  }
}
