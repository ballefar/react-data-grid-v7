import { _utils } from 'react-data-grid-v7';
var getMixedTypeValueRetriever = _utils.getMixedTypeValueRetriever, isImmutableCollection = _utils.isImmutableCollection;
export var comparer = function (a, b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};
var sortRows = function (rows, sortColumn, sortDirection) {
    var retriever = getMixedTypeValueRetriever(isImmutableCollection(rows));
    var sortDirectionSign = sortDirection === 'ASC' ? 1 : -1;
    var rowComparer = function (a, b) {
        return sortDirectionSign * comparer(retriever.getValue(a, sortColumn), retriever.getValue(b, sortColumn));
    };
    if (sortDirection === 'NONE') {
        return rows;
    }
    return rows.slice().sort(rowComparer);
};
export default sortRows;
//# sourceMappingURL=RowSorter.js.map