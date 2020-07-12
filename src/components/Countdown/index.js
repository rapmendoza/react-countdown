import React, { Component } from 'react';
import moment from 'moment';
import 'moment-holiday';

import Timer from './Timer';
import Controls from './Controls';
import Datepicker from './Datepicker';
import HolidaysModal from './HolidaysModal';

export default class Countdown extends Component {
  state = {
    currentDate: moment(),
    nextDate: moment({ year: moment().year() + 1 }),
    paused: false,
    showHolidays: false,
  };

  componentDidMount() {
    this.resume();
  }

  componentWillUnmount() {
    this.pause();
  }

  getRemainingTime() {
    let { currentDate, nextDate } = this.state,
      diff = nextDate.diff(currentDate);

    return moment.duration(diff);
  }

  handleTogglePaused = () => {
    this.setState(({ paused }, props) => {
      paused = !paused;

      if (paused) {
        this.pause();
      } else {
        this.setState({
          currentDate: moment(),
        });
        this.resume();
      }

      return { paused };
    });
  };

  pause() {
    clearInterval(this.interval);
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        currentDate: moment(),
      });
    }, 1000);
  }

  handleDateReset = nextDate => {
    this.setState({ nextDate });
  };

  handleToggleHolidays = () => {
    this.setState({
      showHolidays: !this.state.showHolidays,
    });
  };

  getHolidays() {
    const { currentDate, nextDate } = this.state;

    return currentDate.holidaysBetween(nextDate);
  }

  render() {
    const { paused, currentDate, nextDate, showHolidays } = this.state,
      duration = this.getRemainingTime(),
      holidays = this.getHolidays();

    return (
      <section className="hero is-dark is-bold is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="level">
              <div className="level-item">
                <h1 className="title">{nextDate.calendar()} is Coming Up!</h1>
                <button
                  className="button is-small is-rounded is-light is-outlined mx-2"
                  onClick={this.handleToggleHolidays}
                >
                  Holidays
                </button>
              </div>
            </div>
            <Timer duration={duration} />
            <Datepicker onDateReset={this.handleDateReset} />
            <Controls
              paused={paused}
              onTogglePaused={this.handleTogglePaused}
            />
            <i>{currentDate.format('LLLL (UTCZ)')}</i>
            <HolidaysModal
              active={showHolidays}
              onToggle={this.handleToggleHolidays}
              holidays={holidays}
            />
          </div>
        </div>
      </section>
    );
  }
}
