import { __values } from "tslib";
import { _utils } from 'react-data-grid-v7';
import Resolver from './RowGrouperResolver';
var isImmutableCollection = _utils.isImmutableCollection;
var RowGrouper = /** @class */ (function () {
    function RowGrouper(columns, expandedRows, isImmutable) {
        if (isImmutable === void 0) { isImmutable = false; }
        this.columns = columns.slice(0);
        this.expandedRows = expandedRows;
        this.resolver = new Resolver(isImmutable);
    }
    RowGrouper.prototype.isRowExpanded = function (columnName, name) {
        var isExpanded = true;
        var expandedRowGroup = this.expandedRows[columnName];
        if (expandedRowGroup && expandedRowGroup[name]) {
            isExpanded = expandedRowGroup[name].isExpanded;
        }
        return isExpanded;
    };
    RowGrouper.prototype.groupRowsByColumn = function (rows, columnIndex) {
        var e_1, _a;
        if (columnIndex === void 0) { columnIndex = 0; }
        var nextColumnIndex = columnIndex;
        var columnName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].key;
        var columnGroupDisplayName = this.columns.length > 0 && typeof this.columns[columnIndex] === 'string' ? this.columns[columnIndex] : this.columns[columnIndex].name;
        var groupedRows = this.resolver.getGroupedRows(rows, columnName);
        var keys = this.resolver.getGroupKeys(groupedRows);
        var dataviewRows = this.resolver.initRowsCollection();
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var isExpanded = this.isRowExpanded(columnName, key);
                var rowGroupHeader = { name: key, __metaData: { isGroup: true, treeDepth: columnIndex, isExpanded: isExpanded, columnGroupName: columnName, columnGroupDisplayName: columnGroupDisplayName } };
                dataviewRows = this.resolver.addHeaderRow(rowGroupHeader, dataviewRows);
                if (isExpanded) {
                    nextColumnIndex = columnIndex + 1;
                    if (this.columns.length > nextColumnIndex) {
                        dataviewRows = dataviewRows.concat(this.groupRowsByColumn(this.resolver.getRowObj(groupedRows, key), nextColumnIndex));
                        nextColumnIndex = columnIndex - 1;
                    }
                    else {
                        dataviewRows = dataviewRows.concat(this.resolver.getRowObj(groupedRows, key));
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dataviewRows;
    };
    return RowGrouper;
}());
var groupRows = function (rows, groupedColumns, expandedRows) {
    var rowGrouper = new RowGrouper(groupedColumns, expandedRows, isImmutableCollection(rows));
    return rowGrouper.groupRowsByColumn(rows, 0);
};
export default groupRows;
//# sourceMappingURL=RowGrouper.js.map