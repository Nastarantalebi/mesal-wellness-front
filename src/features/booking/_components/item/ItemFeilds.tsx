import Button from "@/components/Button";
import { useFieldArray } from "react-hook-form";
import type {
  TCreateData,
} from "../../_types/type";
import { itemsValues } from "../../_fixtures/data";

import { PlusIcon } from "lucide-react";
import ItemRowFields from "./ItemRowFields";

type TProps = {
  form: any;
  dataCreate?: TCreateData;
  selectedRecord: any;
};


const ItemForm = ({ form, dataCreate, selectedRecord }: TProps) => {
  const isEdit = !!selectedRecord;
  console.log(dataCreate);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  if (fields.length === 0) append(itemsValues);

  return (
    <>
      <div
        className="w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold mb-3">آیتم‌ها</p>
          <Button
            type="button"
            onClick={() => append(itemsValues)}
            variant="outline-primary">
            <PlusIcon size={16} />
          </Button>
        </div>

        {fields.map((fieldItem, index) => (
          <ItemRowFields
            key={fieldItem.id}
            form={form}
            index={index}
            isEdit={isEdit}
            remove={remove}
          />
        ))}
      </div>
    </>
  );
};

export default ItemForm;
