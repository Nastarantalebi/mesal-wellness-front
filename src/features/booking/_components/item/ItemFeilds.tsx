import Button from "@/components/Button";
import { useFieldArray } from "react-hook-form";
import { itemsValues } from "../../_fixtures/data";

import { PlusIcon } from "lucide-react";
import ItemRowFields from "./ItemRowFields";

type TProps = {
  form: any;
  selectedRecord: any;
  companyDiscount: number;
};

const ItemForm = ({ form, selectedRecord, companyDiscount }: TProps) => {
  const isEdit = !!selectedRecord;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  if (fields.length === 0) append(itemsValues);
  return (
    <>
      <div className="w-full mt-4 p-2 md:p-4 border rounded-lg bg-gray-50 col-span-full overflow-x-hidden">
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
            companyDiscount={companyDiscount}
          />
        ))}
      </div>
    </>
  );
};

export default ItemForm;
