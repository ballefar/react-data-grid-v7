import { _utils } from 'react-data-grid-v7';
import groupBy from 'lodash/groupBy';

const { isImmutableMap, getMixedTypeValueRetriever } = _utils;

export default class RowGrouperResolver {
  constructor(isImmutable) {
    this.isImmutable = isImmutable;
    this.getRowObj = getMixedTypeValueRetriever(isImmutable).getValue;
  }

  initRowsCollection() {
    return this.isImmutable ? new Immutable.List() : [];
  }

  getGroupedRows(rows, columnName) {
    return this.isImmutable ? rows.groupBy(x => isImmutableMap(x) ? x.get(columnName) : x[columnName]) : groupBy(rows, columnName);
  }

  getGroupKeys(groupedRows) {
    let getKeys = Object.keys;
    if (this.isImmutable) {
      getKeys = (col) => {
        const keys = [];
        const iterator = col.keys();
        let item = iterator.next();

        while (!item.done) {
          keys.push(item.value);
          item = iterator.next();
        }
        return keys;
      };
    }
    return getKeys(groupedRows);
  }

  addHeaderRow(rowGroupHeader, dataviewRows) {
    const rows = dataviewRows;
    const dvRows = rows.push(rowGroupHeader);
    if (this.isImmutable) {
      return dvRows;
    }
    return rows;
  }
}
