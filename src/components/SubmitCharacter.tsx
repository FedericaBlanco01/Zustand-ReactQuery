import { SubmitHandler, useForm } from "react-hook-form";

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

export default function SubmitCharacter() {
  const { register, handleSubmit, reset } = useForm<CustomCharacter>();

  const { characters, addCharacter } = useCustomCharacterStore((state) => ({
    characters: state.characters,
    addCharacter: state.addCharacter,
  }));

  const onSubmit: SubmitHandler<CustomCharacter> = (data) => {
    addCharacter(data);
    reset(defaultValues);
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex justify-center">
        <div className="grid grid-cols-1 gap-4 w-2/3 bg-zinc-700 py-10 rounded-lg drop-shadow-xl px-[8%]">
          <p className="mb-2 text-lg text-center font-bold text-green-500">
            Submit a new character
          </p>
          <Input {...register("name")} label="Name" />
          <Select
            {...register("status")}
            label="Status"
            options={statuses}
            defaultValue="alive"
          />
          <Select
            {...register("specie")}
            label="Specie"
            options={species}
            defaultValue="human"
          />
          <Select
            {...register("gender")}
            label="Gender"
            options={genders}
            defaultValue="male"
          />
          <Input label="Origin" {...register("origin")} />
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
