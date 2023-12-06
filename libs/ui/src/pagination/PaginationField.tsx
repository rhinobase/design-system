import { FieldControl } from "../field";
import { InputField } from "../input";

type PaginationField = {
  totalPages: number;
  inputValue: number;
  onPageChange: (value: number) => void;
};

export default function PaginationField({
  inputValue,
  onPageChange,
  totalPages,
}: PaginationField) {
  const handleInput = (value: number) => {
    let newValue = value;
    if (newValue > totalPages) {
      newValue = totalPages;
    }
    return onPageChange(newValue);
  };

  return (
    <FieldControl name="page" className="!w-[70px]">
      <InputField
        type="number"
        min={1}
        value={inputValue === 0 ? "" : inputValue}
        onChange={(e) => handleInput(Number(e.target.value))}
      />
    </FieldControl>
  );
}
