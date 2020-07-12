import React from 'react';

export default ({ active, onToggle, holidays }) => (
  <div className={`modal${active ? ' is-active' : ''}`}>
    <div className="modal-background" onClick={onToggle}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Incoming Holidays in US</p>
        <button
          className="delete"
          aria-label="close"
          onClick={onToggle}
        ></button>
      </header>
      <section className="modal-card-body">
        <table className="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((h, i) => {
              return (
                <tr key={i}>
                  <td>{h.calendar()}</td>
                  <td>{h.isHoliday()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  </div>
);
