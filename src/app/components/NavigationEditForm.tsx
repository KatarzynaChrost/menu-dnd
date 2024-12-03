import React from "react";
import { useForm } from "react-hook-form";

type NavigationItem = {
  id: string;
  label: string;
  url: string;
};

interface NavigationEditFormProps {
  item: NavigationItem;
  onSave: (updatedItem: NavigationItem) => void;
}

const NavigationEditForm: React.FC<NavigationEditFormProps> = ({
  item,
  onSave,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="label" className="block font-bold">
          Label
        </label>
        <input
          id="label"
          {...register("label", { required: "Label jest wymagany" })}
          className="border rounded p-2 w-full"
        />
        {errors.label && <p className="text-red-500">{errors.label.message}</p>}
      </div>

      <div>
        <label htmlFor="url" className="block font-bold">
          URL
        </label>
        <input
          id="url"
          {...register("url")}
          className="border rounded p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Zapisz
      </button>
    </form>
  );
};

export default NavigationEditForm;
