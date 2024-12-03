"use client";
import React, { useState } from "react";
import NavigationForm from "./components/NavigationForm";
import NavigationList from "./components/NavigationList";
import NavigationEditForm from "./components/NavigationEditForm";

export type NavigationItem = {
  id: string;
  label: string;
  url: string;
  //   children?: NavigationItem[];
};

const App: React.FC = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

  const handleAddItem = (newItem: Omit<NavigationItem, "id">) => {
    setNavigationItems([
      ...navigationItems,
      { ...newItem, id: Date.now().toString() },
    ]);
  };

  const handleEditItem = (updatedItem: NavigationItem) => {
    setNavigationItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setNavigationItems((items) => items.filter((item) => item.id !== id));
  };

  const handleReorder = (newOrder: NavigationItem[]) => {
    setNavigationItems(newOrder);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Navigation Manager</h1>

      {/* Formularz dodawania elementów */}
      <NavigationForm onAddItem={handleAddItem} />

      {/* Lista nawigacyjna z obsługą Drag & Drop */}
      <NavigationList
        items={navigationItems}
        onReorder={handleReorder}
        onEditItem={setEditingItem}
        onDeleteItem={handleDeleteItem}
      />

      {/* Formularz edycji elementu */}
      {editingItem && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Edytuj element</h2>
          <NavigationEditForm item={editingItem} onSave={handleEditItem} />
        </div>
      )}
    </div>
  );
};

export default App;
