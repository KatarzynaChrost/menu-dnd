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
      className="p-4 bg-white flex justify-between items-center border-b border-gray-200"
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-move flex items-center"
      >
        <span className="text-gray-500">drag icon</span>
      </div>

      <div>
        <p className="text-gray-800 font-medium">{item.label}</p>
        <p className="text-gray-700">{item.url}</p>
      </div>
      <div className="flex rounded-lg overflow-hidden border border-gray-200 text-gray-800">
        <button onClick={onDelete} className="px-4 py-2 focus:outline-none">
          Usuń
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 focus:outline-none border-r border-l border-gray-200"
        >
          Edytuj
        </button>
        <button
          // onClick={onAddSubItem}
          className="px-4 py-2 focus:outline-none"
        >
          Dodaj pozycję menu
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
