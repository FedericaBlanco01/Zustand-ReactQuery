import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useCustomCharacterStore } from "../stores/CustomCharacterStore";
import { CustomCharacter } from "../types/CustomCharacters";
import Button from "./Button";
import Input from "./Input";
import Select, { Option } from "./Select";

const statuses: Option[] = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const species: Option[] = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "animal", label: "Animal" },
];

const genders: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const defaultValues: CustomCharacter = {
  name: "",
  status: "alive",
  specie: "human",
  gender: "male",
  origin: "",
};

const newCharacterSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  status: z
    .string()
    .min(1, { message: "Status is required" })
    .refine((data) => statuses.map((status) => status.value).includes(data), {
      message: "Status isn't valid",
    }),
  specie: z
    .string()
    .min(1, { message: "Specie is required" })
    .refine((data) => species.map((specie) => specie.value).includes(data), {
      message: "Specie isn't valid",
    }),
  gender: z
    .string()
    .min(1, { message: "Gender is required" })
    .refine((data) => genders.map((gender) => gender.value).includes(data), {
      message: "Gender isn't valid",
    }),
  origin: z.string().min(3, { message: "Origin is required" }),
});

export type NewCharacterFormValues = z.infer<typeof newCharacterSchema>;

export default function SubmitCharacter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCharacterFormValues>({
    resolver: zodResolver(newCharacterSchema),
    defaultValues: defaultValues,
  });

  const { characters, addCharacter } = useCustomCharacterStore((state) => ({
    characters: state.characters,
    addCharacter: state.addCharacter,
  }));

  const onSubmit: SubmitHandler<CustomCharacter> = (data) => {
    addCharacter(data);
    reset();
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex justify-center">
        <div className="grid grid-cols-1 gap-4 w-2/3 bg-zinc-700 py-10 rounded-lg drop-shadow-xl px-[8%]">
          <p className="mb-2 text-lg text-center font-bold text-green-500">
            Submit a new character
          </p>
          <Input
            {...register("name")}
            label="Name"
            error={errors.name?.message}
          />
          <Select
            {...register("status")}
            label="Status"
            options={statuses}
            defaultValue="alive"
            error={errors.status?.message}
          />
          <Select
            {...register("specie")}
            label="Specie"
            options={species}
            defaultValue="human"
            error={errors.specie?.message}
          />
          <Select
            {...register("gender")}
            label="Gender"
            options={genders}
            defaultValue="male"
            error={errors.gender?.message}
          />
          <Input
            label="Origin"
            {...register("origin")}
            error={errors.origin?.message}
          />
          <Button
            label="Submit"
            type="submit"
            className="w-[20%] justify-self-center"
          />
        </div>
      </form>
    </div>
  );
}
