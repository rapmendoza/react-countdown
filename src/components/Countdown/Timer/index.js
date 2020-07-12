import React from 'react';
import TimerItem from './Item';

const Timer = ({ duration }) => (
  <nav className="level">
    <TimerItem count={Math.floor(duration.asDays())} label="Days" />
    <TimerItem
      count={duration.hours().toString().padStart(2, '0')}
      label="Hours"
    />
    <TimerItem
      count={duration.minutes().toString().padStart(2, '0')}
      label="Minutes"
    />
    <TimerItem
      count={duration.seconds().toString().padStart(2, '0')}
      label="Seconds"
    />
  </nav>
);

export default Timer;
