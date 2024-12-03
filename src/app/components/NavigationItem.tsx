import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-gray-200 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <span>{item.label}</span>
        <button className="text-blue-500 hover:underline">Edytuj</button>
      </div>
    </li>
  );
}
