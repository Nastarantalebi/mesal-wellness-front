"use client";

import clsx from "clsx";
import { useState,type KeyboardEvent,type ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type Props<TFormValues extends FieldValues> = {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  placeholder?: string;
  inputClassName?: string;
};

function TagsInput<TFormValues extends FieldValues>({
  field,
  placeholder = "خصوصیت اضافه کنید...",
  inputClassName,
}: Props<TFormValues>) {
  const { value = [], onChange } = field;
  const [tags, setTags] = useState<string[]>(value.length ? value : []);
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    onChange(newTags);
    setInput("");
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[44px]">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="text-red-500 font-bold"
              onClick={() => removeTag(idx)}
            >
              ×
            </button>
          </div>
        ))}

        <input
          type="text"
          className={clsx(
            "flex-1 border-none outline-none bg-transparent text-sm min-w-[120px]",
            inputClassName
          )}
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default TagsInput;
