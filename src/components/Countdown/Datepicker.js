import React, { Component } from 'react';
import moment from 'moment';

export default class extends Component {
  state = {
    date: '',
    valid: true,
  };

  handleDateChange = ({ target: { value } }) => {
    const date = moment(value),
      valid = date.isValid() && date.isAfter();

    this.setState({
      valid,
      date: value,
    });

    valid && this.props.onDateReset(date);
  };

  render() {
    let { date, valid } = this.state,
      classes = 'input is-medium is-rounded';

    if (date) {
      valid ? (classes += ' is-success') : (classes += ' is-danger');
    }

    return (
      <div className="field is-grouped is-grouped-centered my-6">
        <p className="control has-text-centered">
          <input
            className={classes}
            placeholder="Pick a date.."
            value={date}
            onChange={this.handleDateChange}
          />
          {date && !valid && (
            <small className="help is-danger">
              Please type a valid and future date.
            </small>
          )}
        </p>
      </div>
    );
  }
}
