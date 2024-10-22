import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';

import { Types } from './define';
import Card from 'components/Card';

function DragDrop({ children }) {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

const DraggableCard = ({ id, ...props }) => {
    const [collected, dragRef, dragPreview] = useDrag({
        type: Types.CARD,
        item: { id }
    });

    return collected.isDragging ? (
        <div className="draggable-card" ref={dragPreview} />
    ) : (
        <div className="draggable-card" ref={dragRef} {...collected}>
            <Card>{props.children}</Card>
        </div>
    );
};

const DroppableCard = ({ id, onDrag, children, ...props }) => {
    const [{}, dropRef] = useDrop({
        accept: Types.CARD,
        drop: (item, monitor) => {
            const from = item.id;
            const to = id;
            onDrag(from, to);
        }
        // canDrop: (item) => item.columnIndex !== columnIndex
    });

    return (
        <div className="droppable-card" {...props} ref={dropRef}>
            {children}
        </div>
    );
};

export default DragDrop;
export { DraggableCard, DroppableCard };
