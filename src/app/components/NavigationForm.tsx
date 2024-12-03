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
    <form onSubmit={handleSubmit(onAddItem)} className="space-y-4">
      <div>
        <label htmlFor="label" className="block">
          Label
        </label>
        <input
          id="label"
          {...register("label")}
          className="border p-2 w-full"
        />
        {errors.label && (
          <span className="text-red-500">{errors.label.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="url" className="block">
          URL
        </label>
        <input id="url" {...register("url")} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add
      </button>
    </form>
  );
};

export default NavigationForm;
