import React from 'react';
import ReactDataGrid from 'react-data-grid-v7';

import exampleWrapper from '../components/exampleWrapper';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'task', name: 'Title' },
      { key: 'priority', name: 'Priority' },
      { key: 'issueType', name: 'Issue Type' },
      { key: 'complete', name: '% Complete' }
    ];

    this.state = null;
  }

  createRows = () => {
    const rows = [];
    for (let i = 1; i < 1000000; i++) {
      rows.push({
        id: i,
        task: `Task ${i}`,
        complete: 'a',
        priority: 'b',
        issueType: 'c'
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500}
      />
    );
  }
}

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'One Million Rows Example',
  exampleDescription: 'A grid with 1 Million rows.',
  examplePath: './scripts/example10-one-million-rows.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/9/'
});
