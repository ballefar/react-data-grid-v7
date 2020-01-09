import { __extends } from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
var DraggableHeaderCell = /** @class */ (function (_super) {
    __extends(DraggableHeaderCell, _super);
    function DraggableHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableHeaderCell.prototype.render = function () {
        var _a = this.props, connectDragSource = _a.connectDragSource, connectDropTarget = _a.connectDropTarget, isDragging = _a.isDragging, isOver = _a.isOver, canDrop = _a.canDrop;
        var opacity = 1;
        if (isDragging) {
            opacity = 0.2;
        }
        // set drag source and drop target on header cell
        // width: 0 - otherwise drag clone was wrongly positioned
        return connectDragSource(connectDropTarget(React.createElement("div", { style: { width: 0, cursor: 'move', opacity: opacity }, className: isOver && canDrop ? 'rdg-can-drop' : '' }, this.props.children)));
    };
    DraggableHeaderCell.propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        isOver: PropTypes.bool,
        canDrop: PropTypes.bool,
        children: PropTypes.element.isRequired
    };
    return DraggableHeaderCell;
}(React.Component));
// drop source
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}
var headerCellSource = {
    beginDrag: function (props) {
        return {
            // source column
            key: props.column.key
        };
    },
    endDrag: function (props, monitor) {
        // check if drop was made in droppable zone
        if (monitor.didDrop()) {
            var source = monitor.getDropResult().source;
            var target_1 = monitor.getDropResult().target;
            return props.onHeaderDrop(source, target_1);
        }
    }
};
// drop target
var target = {
    drop: function (props, monitor) {
        var source = monitor.getItem().key;
        var targetKey = props.column.key;
        return {
            source: source,
            target: targetKey
        };
    }
};
function targetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedHeader: monitor.getItem()
    };
}
export default DragSource('Column', headerCellSource, collect)(DropTarget('Column', target, targetCollect)(DraggableHeaderCell));
//# sourceMappingURL=DraggableHeaderCell.js.map