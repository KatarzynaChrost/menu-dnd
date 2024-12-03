import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import Search from "../../../public/search.svg";
import Trash from "../../../public/trash.svg";

type NavigationItem = {
  id: string;
  label: string;
  url: string;
};

interface NavigationEditFormProps {
  item: NavigationItem;
  onSave: (updatedItem: NavigationItem) => void;
  hide: () => void;
}

const NavigationEditForm: React.FC<NavigationEditFormProps> = ({
  item,
  onSave,
  hide,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NavigationItem>({
    defaultValues: item,
  });

  const onSubmit = (data: NavigationItem) => {
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white border border-gray-200 p-4 rounded-lg"
    >
      <div className="grid grid-cols-[1fr_4rem]">
        <div className="space-y-2">
          <div className="space-y-2">
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Nazwa
            </label>
            <input
              id="label"
              {...register("label")}
              placeholder="np. Promocje"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
            />
            {errors.label && (
              <span className="text-red-500 text-sm">
                {errors.label.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Image src={Search} width={20} height={20} alt="search icon" />
              </span>
              <input
                id="url"
                {...register("url")}
                placeholder="Wklej lub wyszukaj"
                className="border border-gray-300 p-2 w-full pl-8 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
          </div>
        </div>
        <div className="flex items-end flex-col p-3">
          <button onClick={hide}>
            <Image src={Trash} width={20} height={20} alt="trash icon" />
          </button>
        </div>
      </div>

      <div className="flex justify-start gap-4 text-sm font-semibold">
        <button
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
          onClick={hide}
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="bg-white text-purple-600 border-purple-600 border px-4 py-2 rounded-md hover:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-600"
        >
          Zapisz zmiany
        </button>
      </div>
    </form>
  );
};

export default NavigationEditForm;
