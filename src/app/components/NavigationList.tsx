import React from "react";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";

type NavigationItem = {
  id: string;
  label: string;
  url: string;
};

interface NavigationListProps {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEditItem: (item: NavigationItem) => void;
  onDeleteItem: (id: string) => void;
}

const SortableItem: React.FC<{
  item: NavigationItem;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ item, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      style={style}
      className="p-4 border rounded my-2 bg-white flex justify-between items-center"
    >
      <div ref={setNodeRef} {...attributes} {...listeners}>
        drag me
      </div>
      <span>{item.label}</span>
      <div className="flex space-x-2">
        <button onClick={onEdit} className="text-blue-500">
          Edytuj
        </button>
        <button onClick={onDelete} className="text-red-500">
          Usuń
        </button>
      </div>
    </div>
  );
};

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  onReorder,
  onEditItem,
  onDeleteItem,
}) => {
  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)}>
        {items.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default NavigationList;
