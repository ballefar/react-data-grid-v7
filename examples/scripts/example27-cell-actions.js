import React from 'react';
import ReactDataGrid from 'react-data-grid-v7';
import { Data, Formatters } from 'react-data-grid-v7-addons';
import faker from 'faker';

import exampleWrapper from '../components/exampleWrapper';

const { Selectors } = Data;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const createFakeRowObjectData = (index) => ({
  id: `id_${index}`,
  avartar: faker.image.avatar(),
  county: faker.address.county(),
  email: faker.internet.email(),
  title: faker.name.prefix(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  street: faker.address.streetName(),
  zipCode: faker.address.zipCode(),
  date: faker.date.past().toLocaleDateString(),
  bs: faker.company.bs(),
  catchPhrase: faker.company.catchPhrase(),
  companyName: faker.company.companyName(),
  words: faker.lorem.words(),
  sentence: faker.lorem.sentence()
});

const createRows = (numberOfRows) => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }
  return rows;
};

const columns = [
  {
    key: 'id',
    name: 'ID',
    width: 80,
    resizable: true
  },
  {
    key: 'avartar',
    name: 'Avartar',
    width: 60,
    formatter: ImageFormatter
  },
  {
    key: 'county',
    name: 'County',
    width: 200
  },
  {
    key: 'title',
    name: 'Title',
    width: 200
  },
  {
    key: 'firstName',
    name: 'First Name',
    width: 200
  },
  {
    key: 'lastName',
    name: 'Last Name',
    width: 200
  },
  {
    key: 'email',
    name: 'Email',
    width: 200
  },
  {
    key: 'street',
    name: 'Street',
    width: 200
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    width: 200
  },
  {
    key: 'date',
    name: 'Date',
    width: 200
  },
  {
    key: 'bs',
    name: 'bs',
    width: 200
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    width: 200
  },
  {
    key: 'companyName',
    name: 'Company Name',
    width: 200
  },
  {
    key: 'sentence',
    name: 'Sentence',
    width: 200
  }
];

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: createRows(2000) };
  }

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getRowAt = (index) => {
    const rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.getRows().length;
  };

  getCellActions(column, row) {
    if (column.key === 'county' && row.id === 'id_0') {
      return [
        {
          icon: <span className="glyphicon glyphicon-remove" />,
          callback() { alert('Deleting'); }
        },
        {
          icon: <span className="glyphicon glyphicon-link" />,
          actions: [
            {
              text: 'Edit Cell',
              callback() { alert('Edit Cell'); }
            },
            {
              text: <><span className="fa fa-copy" /> Copy Cell</>,
              callback() { alert('Copied'); }
            }
          ]
        }
      ];
    }
  }

  render() {
    return (
      <ReactDataGrid
        ref={node => this.grid = node}
        enableCellSelect
        columns={columns}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        rowHeight={55}
        minHeight={600}
        getCellActions={this.getCellActions}
      />
    );
  }
}

const exampleDescription = (
  <div>
    <p>This example demonstrates how one can add on custom actions to the cells of any column and row.</p>
    <p>This feature was designed in such a way that one can decide which combination of row/columns should have actions on them.</p>
    <p>To use the cell action simply create a function called <code>getCellActions</code> which will be passed to your react data grid instance</p>
    <p>The function is called by react data grid for each cell with a column and row object, you can then create any condition you deem fit and return an array of objects to be rendered</p>
    <p><code>{'[{actionIcon, actionCallback}]'}</code> will render an action button</p>
    <p><code>{'[{actionIcon, actions: [{actionIcon, actionText, actionCallback}]}]'}</code> will render an action menu with the button opening a dropdown of actions</p>
  </div>
);

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Cell Actions Example',
  exampleDescription,
  examplePath: './scripts/example27-cell-actions.js'
});
