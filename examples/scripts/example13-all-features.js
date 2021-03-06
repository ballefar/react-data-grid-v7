import React from 'react';
import ReactDataGrid from 'react-data-grid-v7';
import { Editors, Toolbar, Formatters } from 'react-data-grid-v7-addons';
import update from 'immutability-helper';
import faker from 'faker';

import exampleWrapper from '../components/exampleWrapper';

const { DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
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
        formatter: ImageFormatter,
        resizable: true,
        headerRenderer: <ImageFormatter value={faker.image.cats()} />
      },
      {
        key: 'title',
        name: 'Title',
        editor: <DropDownEditor options={titles} />,
        width: 200,
        resizable: true,
        events: {
          onDoubleClick() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: 'firstName',
        name: 'First Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'lastName',
        name: 'Last Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'email',
        name: 'Email',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'street',
        name: 'Street',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'zipCode',
        name: 'ZipCode',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'date',
        name: 'Date',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'bs',
        name: 'bs',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'catchPhrase',
        name: 'Catch Phrase',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'companyName',
        name: 'Company Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'sentence',
        name: 'Sentence',
        editable: true,
        width: 200,
        resizable: true
      }
    ];

    this.state = { rows: this.createRows(2000) };
  }

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    return rows;
  };

  createFakeRowObjectData = (index) => {
    return {
      id: `id_${index}`,
      avartar: faker.image.avatar(),
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
    };
  };

  getColumns = () => {
    const clonedColumns = this._columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };

    return clonedColumns;
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      const rowToUpdate = rows[i];
      const updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  handleAddRow = ({ newRowIndex }) => {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  };

  getRowAt = (index) => {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  };

  getSize = () => {
    return this.state.rows.length;
  };

  render() {
    return (
      <ReactDataGrid
        ref={node => this.grid = node}
        enableCellSelect
        columns={this.getColumns()}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        toolbar={<Toolbar onAddRow={this.handleAddRow} />}
        enableRowSelect
        rowHeight={50}
        minHeight={600}
      />
    );
  }
}

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'All the features grid',
  exampleDescription: 'This example demonstrates all the features from the previous examples.',
  examplePath: './scripts/example13-all-features.js',
  examplePlaygroundLink: undefined
});
