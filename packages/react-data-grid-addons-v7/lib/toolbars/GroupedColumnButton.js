import React, { useCallback } from 'react';
export default function GroupedColumnButton(_a) {
    var name = _a.name, columnKey = _a.columnKey, onColumnGroupDeleted = _a.onColumnGroupDeleted;
    var onClick = useCallback(function () { return onColumnGroupDeleted(columnKey); }, [columnKey, onColumnGroupDeleted]);
    return (React.createElement("div", { className: "grouped-col-btn btn btn-sm" },
        React.createElement("span", { className: "grouped-col-btn__name" }, name),
        React.createElement("span", { className: "grouped-col-btn__remove glyphicon glyphicon-trash", onClick: onClick })));
}
//# sourceMappingURL=GroupedColumnButton.js.map