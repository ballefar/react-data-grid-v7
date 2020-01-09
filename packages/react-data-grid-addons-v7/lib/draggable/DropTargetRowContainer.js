import { __assign, __extends } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import { rowComparer } from 'react-data-grid-v7';
var rowDropTarget = function (Row) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.shouldComponentUpdate = function (nextProps) {
        return rowComparer(nextProps, this.props);
    };
    class_1.prototype.moveRow = function () {
        ReactDOM.findDOMNode(this).classList.add('slideUp');
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, connectDropTarget = _a.connectDropTarget, isOver = _a.isOver, canDrop = _a.canDrop;
        var overlayTop = this.props.idx * this.props.height;
        return connectDropTarget(React.createElement("div", null,
            React.createElement(Row, __assign({ ref: function (node) { return _this.row = node; } }, this.props)),
            isOver && canDrop && (React.createElement("div", { className: "rowDropTarget", style: {
                    top: overlayTop,
                    height: this.props.height
                } }))));
    };
    return class_1;
}(React.Component)); };
var target = {
    drop: function (props, monitor, component) {
        // Obtain the dragged item
        component.moveRow();
        var rowSource = monitor.getItem();
        var rowTarget = { idx: props.idx, data: props.row };
        props.onRowDrop({ rowSource: rowSource, rowTarget: rowTarget });
    }
};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedRow: monitor.getItem()
    };
}
export default (function (Row) { return DropTarget('Row', target, collect, { arePropsEqual: function (nextProps, currentProps) { return !rowComparer(nextProps, currentProps); } })(rowDropTarget(Row)); });
//# sourceMappingURL=DropTargetRowContainer.js.map