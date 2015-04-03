import React from 'react';
import _ from 'lodash';

import StatusStore from '../stores/Status';
import BaseSection from './BaseSection';


export default class StatusTracker extends BaseSection {
  constructor(props) {
    super(props, {
      statuses: StatusStore.getStatuses(),
    });
    this.title = 'Status Tracker';
    this.className = 'StatusTracker';
  }

  componentDidMount() {
    StatusStore.on('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    StatusStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState({
      statuses: StatusStore.getStatuses(),
    });
  }

  renderBody() {
    return (
      <div>
        <ul>
          {this.state.statuses.map((status, i) => (
            <StatusLine {...status} key={`status-${i}`}/>
          ))}
        </ul>
      </div>
    );
  }
}


class StatusLine extends React.Component {
  render() {
    return (
      <li>
        {this.props.name}: {this.props.currentHP} / {this.props.maxHP}
      </li>
    );
  }
}
