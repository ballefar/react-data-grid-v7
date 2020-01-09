import { _utils } from 'react-data-grid-v7';
import groupBy from 'lodash/groupBy';
var isImmutableMap = _utils.isImmutableMap, getMixedTypeValueRetriever = _utils.getMixedTypeValueRetriever;
var RowGrouperResolver = /** @class */ (function () {
    function RowGrouperResolver(isImmutable) {
        this.isImmutable = isImmutable;
        this.getRowObj = getMixedTypeValueRetriever(isImmutable).getValue;
    }
    RowGrouperResolver.prototype.initRowsCollection = function () {
        return this.isImmutable ? new Immutable.List() : [];
    };
    RowGrouperResolver.prototype.getGroupedRows = function (rows, columnName) {
        return this.isImmutable ? rows.groupBy(function (x) { return isImmutableMap(x) ? x.get(columnName) : x[columnName]; }) : groupBy(rows, columnName);
    };
    RowGrouperResolver.prototype.getGroupKeys = function (groupedRows) {
        var getKeys = Object.keys;
        if (this.isImmutable) {
            getKeys = function (col) {
                var keys = [];
                var iterator = col.keys();
                var item = iterator.next();
                while (!item.done) {
                    keys.push(item.value);
                    item = iterator.next();
                }
                return keys;
            };
        }
        return getKeys(groupedRows);
    };
    RowGrouperResolver.prototype.addHeaderRow = function (rowGroupHeader, dataviewRows) {
        var rows = dataviewRows;
        var dvRows = rows.push(rowGroupHeader);
        if (this.isImmutable) {
            return dvRows;
        }
        return rows;
    };
    return RowGrouperResolver;
}());
export default RowGrouperResolver;
//# sourceMappingURL=RowGrouperResolver.js.map