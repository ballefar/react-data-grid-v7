import { __extends } from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { CheckboxEditor } from 'react-data-grid-v7';
var RowActionsCell = /** @class */ (function (_super) {
    __extends(RowActionsCell, _super);
    function RowActionsCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowActionsCell.prototype.renderRowIndex = function () {
        return (React.createElement("div", { className: "rdg-row-index" }, this.props.rowIdx + 1));
    };
    RowActionsCell.prototype.render = function () {
        var _a = this.props, connectDragSource = _a.connectDragSource, rowSelection = _a.rowSelection;
        var rowHandleStyle = rowSelection != null ? { position: 'absolute', marginTop: '5px' } : {};
        var isSelected = this.props.value;
        var editorClass = isSelected ? 'rdg-actions-checkbox selected' : 'rdg-actions-checkbox';
        return connectDragSource(React.createElement("div", null,
            React.createElement("div", { className: "rdg-drag-row-handle", style: rowHandleStyle }),
            !isSelected ? this.renderRowIndex() : null,
            rowSelection != null && (React.createElement("div", { className: editorClass },
                React.createElement(CheckboxEditor, { column: this.props.column, rowIdx: this.props.rowIdx, dependentValues: this.props.dependentValues, value: this.props.value })))));
    };
    RowActionsCell.propTypes = {
        rowIdx: PropTypes.number.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        isRowHovered: PropTypes.bool,
        column: PropTypes.object,
        dependentValues: PropTypes.object,
        value: PropTypes.bool,
        rowSelection: PropTypes.object.isRequired
    };
    RowActionsCell.defaultProps = {
        rowIdx: 0
    };
    return RowActionsCell;
}(React.Component));
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    };
}
var rowIndexSource = {
    beginDrag: function (props) {
        return { idx: props.rowIdx, data: props.dependentValues };
    },
    endDrag: function (props) {
        return { idx: props.rowIdx, data: props.dependentValues };
    }
};
export default DragSource('Row', rowIndexSource, collect)(RowActionsCell);
//# sourceMappingURL=RowActionsCell.js.map