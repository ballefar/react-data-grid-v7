import { __extends } from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _utils } from 'react-data-grid-v7';
import html5DragDropContext from '../shared/html5DragDropContext';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
var isColumnsImmutable = _utils.isColumnsImmutable;
var DraggableContainer = /** @class */ (function (_super) {
    __extends(DraggableContainer, _super);
    function DraggableContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableContainer.prototype.getRows = function (rowsCount, rowGetter) {
        var rows = [];
        for (var j = 0; j < rowsCount; j++) {
            rows.push(rowGetter(j));
        }
        return rows;
    };
    DraggableContainer.prototype.renderGrid = function () {
        return React.cloneElement(React.Children.only(this.props.children), {
            draggableHeaderCell: DraggableHeaderCell
        });
    };
    DraggableContainer.prototype.render = function () {
        var grid = this.renderGrid();
        var rowGetter = this.props.getDragPreviewRow || grid.props.rowGetter;
        var rowsCount = grid.props.rowsCount;
        var columns = grid.props.columns;
        var rows = this.getRows(rowsCount, rowGetter);
        return (React.createElement("div", null,
            grid,
            React.createElement(RowDragLayer, { rowSelection: grid.props.rowSelection, rows: rows, columns: isColumnsImmutable(columns) ? columns.toArray() : columns })));
    };
    DraggableContainer.propTypes = {
        children: PropTypes.element.isRequired,
        getDragPreviewRow: PropTypes.func
    };
    return DraggableContainer;
}(Component));
export default html5DragDropContext(DraggableContainer);
//# sourceMappingURL=DragDropContainer.js.map