"use client";
import React, { useState } from "react";
import NavigationList from "./components/NavigationList";
import NavigationForm from "./components/NavigationForm";
import NavigationEditForm from "./components/NavigationEditForm";
import Image from "next/image";
import Add from "../../public/add.svg";

export type NavigationItem = {
  id: string;
  label: string;
  url: string;
  children?: NavigationItem[];
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

  const handleAddSubItem = (parentId: string) => {
    const newSubItem: NavigationItem = {
      id: Date.now().toString(),
      label: "Nowa pozycja",
      url: "",
    };

    setNavigationItems((prevItems) =>
      addSubItemRecursive(prevItems, parentId, newSubItem)
    );
  };

  const addSubItemRecursive = (
    items: NavigationItem[],
    parentId: string,
    newSubItem: NavigationItem
  ): NavigationItem[] => {
    return items.map((item) =>
      item.id === parentId
        ? { ...item, children: [...(item.children || []), newSubItem] }
        : item.children
        ? {
            ...item,
            children: addSubItemRecursive(item.children, parentId, newSubItem),
          }
        : item
    );
  };

  const handleEditItem = (updatedItem: NavigationItem) => {
    setNavigationItems(editItemRecursive(navigationItems, updatedItem));
    setEditingItem(null);
  };

  const editItemRecursive = (
    items: NavigationItem[],
    updatedItem: NavigationItem
  ): NavigationItem[] => {
    return items.map((item) =>
      item.id === updatedItem.id
        ? { ...item, ...updatedItem }
        : item.children
        ? { ...item, children: editItemRecursive(item.children, updatedItem) }
        : item
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setNavigationItems(deleteItemRecursive(navigationItems, itemId));
  };

  const deleteItemRecursive = (
    items: NavigationItem[],
    itemId: string
  ): NavigationItem[] => {
    return items
      .filter((item) => item.id !== itemId)
      .map((item) => ({
        ...item,
        children: item.children
          ? deleteItemRecursive(item.children, itemId)
          : undefined,
      }));
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
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2 text-sm"
            onClick={() => setShowForm(true)}
          >
            <Image src={Add} width={20} height={20} alt="add icon" />
            Dodaj pozycję menu
          </button>
        </div>
      )}
      <div className="rounded-lg overflow-hidden w-full border border-gray-300">
        {showForm && navigationItems?.length === 0 && (
          <NavigationForm
            onAddItem={handleAddItem}
            hide={() => setShowForm(false)}
          />
        )}

        <NavigationList
          items={navigationItems}
          onReorder={handleReorder}
          onEditItem={setEditingItem}
          onDeleteItem={handleDeleteItem}
          onAddSubItem={handleAddSubItem}
        />

        {showMoreForm && navigationItems?.length > 0 && (
          <div className="p-4 bg-gray-100">
            <NavigationForm
              onAddItem={handleAddItem}
              hide={() => setShowMoreForm(false)}
            />
          </div>
        )}

        {showForm && navigationItems?.length > 0 && (
          <div className="w-full p-4 bg-gray-100">
            <button
              className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 text-sm font-semibold"
              onClick={() => setShowMoreForm(true)}
            >
              Dodaj pozycje menu
            </button>
          </div>
        )}

        {editingItem && (
          <div className="p-4 bg-gray-100">
            <NavigationEditForm
              item={editingItem}
              onSave={handleEditItem}
              hide={() => setShowMoreForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
