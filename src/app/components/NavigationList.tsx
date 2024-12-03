import React from "react";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";

import Drag from "../../../public/drag.svg";
import Image from "next/image";

type NavigationItem = {
  id: string;
  label: string;
  url: string;
  children?: NavigationItem[];
};

interface SortableItemProps {
  item: NavigationItem;
  onEdit: () => void;
  onDelete: () => void;
  onAddSubItem: (parentId: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  item,
  onEdit,
  onDelete,
  onAddSubItem,
}) => {
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
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white flex flex-col border-b border-gray-200"
    >
      <div className="flex justify-between items-center ml-7">
        <div className="flex gap-5 items-center">
          <div {...attributes} {...listeners} className="cursor-move">
            <Image src={Drag} width={20} height={20} alt="drag icon" />
          </div>
          <div className="space-y-1">
            <p className="text-gray-800 font-semibold text-sm">{item.label}</p>
            <p className="text-gray-700 text-sm font-normal">{item.url}</p>
          </div>
        </div>
        <div className="flex rounded-lg text-sm font-semibold overflow-hidden border border-gray-200 text-gray-800">
          <button onClick={onDelete} className="px-4 py-2">
            Usuń
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 border-r border-l border-gray-200"
          >
            Edytuj
          </button>
          <button onClick={() => onAddSubItem(item.id)} className="px-4 py-2">
            Dodaj pozycję
          </button>
        </div>
      </div>

      {item.children && (
        <div className="ml-8 mt-2">
          <NavigationList
            items={item.children}
            onEditItem={onEdit}
            onDeleteItem={onDelete}
            onReorder={() => onAddSubItem(item.id)}
            onAddSubItem={onAddSubItem}
          />
        </div>
      )}
    </div>
  );
};

interface NavigationListProps {
  items: NavigationItem[];
  onReorder: (items: NavigationItem[]) => void;
  onEditItem: (item: NavigationItem) => void;
  onDeleteItem: (id: string) => void;
  onAddSubItem: (parentId: string) => void;
}

const NavigationList: React.FC<NavigationListProps> = ({
  items,
  onReorder,
  onEditItem,
  onDeleteItem,
  onAddSubItem,
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
            onAddSubItem={(parentId) => onAddSubItem(parentId)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default NavigationList;
