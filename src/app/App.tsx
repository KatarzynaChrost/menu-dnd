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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMoreForm, setShowMoreForm] = useState<boolean>(false);

  const handleAddItem = (newItem: Omit<NavigationItem, "id">) => {
    setNavigationItems([
      ...navigationItems,
      { ...newItem, id: Date.now().toString() },
    ]);
    setShowMoreForm(false);
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
      {!showForm && navigationItems?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-base font-semibold text-gray-900">
            Menu jest puste
          </p>
          <p className="text-sm font-normal text-gray-600 mt-1">
            W tym menu nie ma jeszcze żadnych linków.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            onClick={() => setShowForm(true)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      )}
      <div className="rounded-lg overflow-hidden w-full border border-gray-300">
        {showForm && navigationItems?.length === 0 && (
          <NavigationForm onAddItem={handleAddItem} />
        )}

        <NavigationList
          items={navigationItems}
          onReorder={handleReorder}
          onEditItem={setEditingItem}
          onDeleteItem={handleDeleteItem}
        />

        {showMoreForm && navigationItems?.length > 0 && (
          <div className="p-4 bg-slate-100">
            <NavigationForm onAddItem={handleAddItem} />
          </div>
        )}

        {showForm && navigationItems?.length > 0 && (
          <div className="w-full p-4 bg-gray-200">
            <button
              className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1"
              onClick={() => setShowMoreForm(true)}
            >
              Dodaj pozycje menu
            </button>
          </div>
        )}

        {editingItem && (
          <div className="mt-4">
            <NavigationEditForm item={editingItem} onSave={handleEditItem} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
