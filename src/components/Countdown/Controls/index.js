import React from 'react';
import Control from './Control';

export default ({ paused, onTogglePaused }) => (
  <div className="field is-grouped is-grouped-centered">
    <Control disabled={paused} color=" is-danger" onClick={onTogglePaused}>
      Pause
    </Control>
    <Control disabled={!paused} color=" is-success" onClick={onTogglePaused}>
      Resume
    </Control>
  </div>
);
