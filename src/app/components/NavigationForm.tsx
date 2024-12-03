import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationItem } from "../App";

const schema = z.object({
  label: z.string().trim().min(1, { message: "Label is required" }),
  url: z.string().optional(),
});

type NavigationFormData = z.infer<typeof schema>;

interface NavigationFormProps {
  onAddItem: (data: NavigationItem) => void;
}

const NavigationForm: React.FC<NavigationFormProps> = ({ onAddItem }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NavigationFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onAddItem)}
      className="space-y-4 bg-white border border-gray-200 p-4 rounded-lg"
    >
      <div className="grid grid-cols-[1fr_3rem]">
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
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                🔍
              </span>
              <input
                id="url"
                {...register("url")}
                placeholder="Wklej lub wyszukaj"
                className="border border-gray-300 p-2 w-full pl-8 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
        <button> X </button>
      </div>

      <div className="flex justify-start gap-4">
        <button
          type="button"
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="bg-white text-purple-500 border-purple-500 border px-4 py-2 rounded-md hover:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          Dodaj
        </button>
      </div>
    </form>
  );
};

export default NavigationForm;
