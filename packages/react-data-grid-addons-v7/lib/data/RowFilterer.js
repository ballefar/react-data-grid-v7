import { _utils } from 'react-data-grid-v7';
var isImmutableCollection = _utils.isImmutableCollection, getMixedTypeValueRetriever = _utils.getMixedTypeValueRetriever;
var filterRows = function (filters, rows) {
    if (rows === void 0) { rows = []; }
    return rows.filter(function (r) {
        var retriever = getMixedTypeValueRetriever(isImmutableCollection(r));
        var include = true;
        for (var columnKey in filters) {
            if (filters.hasOwnProperty(columnKey)) {
                var colFilter = filters[columnKey];
                // check if custom filter function exists
                if (colFilter.filterValues && typeof colFilter.filterValues === 'function') {
                    include &= colFilter.filterValues(r, colFilter, columnKey);
                }
                else if (typeof colFilter.filterTerm === 'string') {
                    // default filter action
                    var rowValue = retriever.getValue(r, columnKey);
                    if (rowValue !== undefined && rowValue !== null) {
                        if (rowValue.toString().toLowerCase().indexOf(colFilter.filterTerm.toLowerCase()) === -1) {
                            include &= false;
                        }
                    }
                    else {
                        include &= false;
                    }
                }
            }
        }
        return Boolean(include);
    });
};
export default filterRows;
//# sourceMappingURL=RowFilterer.js.map