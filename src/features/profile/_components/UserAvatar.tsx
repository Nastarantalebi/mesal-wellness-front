import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, CheckIcon, Trash2Icon } from "lucide-react";
import {
  avatarValidationSchema,
  avatarInitialValue,
} from "../_fixtures/validation";
import type { TAvatar } from "../_types/type";
import useChangeAvatar from "../_services/useChangeAvatar";
import useDeleteAvatar from "../_services/useDeleteAvatar";
import FormComponent from "@/components/Form/Form";
import Button from "@/components/Button";
import { FormLabel } from "@/components/Form";

function UserAvatar({ data, refetch }: any) {
  const { mutateAsync: uploadAvatar, isPending } = useChangeAvatar();
  const { mutateAsync: deleteAvatar, isPending: deleteLoading } =
    useDeleteAvatar();

  const form = useForm<TAvatar>({
    resolver: zodResolver(avatarValidationSchema),
    defaultValues: avatarInitialValue,
    mode: "onChange",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (data?.avatar) setPreview(data.avatar);
    else setPreview(null);
  }, [data]);

  const handleFileChange = (file: File | null) => {
    if (!file) return setPreview(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const hasImg = form.watch("avatar");
  const avatarError = form.formState.errors.avatar?.message;
  return (
    <div className="flex items-center justify-center">
      <FormComponent<TAvatar>
        size="custom"
        className="bg-transparent border-none text-center items-center justify-center shadow-none"
        form={form}
        showSubmitButton={false}
        onSubmit={async (values) => {
          const formData = new FormData();
          if (values.avatar instanceof File) {
            formData.append("avatar", values.avatar);
          }

          await uploadAvatar(formData);
          form.reset({ avatar: null });
          refetch();
        }}
        button={
          preview && (
            <div className="flex items-center gap-3 mt-2 justify-center">
              <Button
                variant="success"
                className={`${!hasImg ? "hidden" : "inline-block"}`}
                disabled={isPending || !preview}>
                <CheckIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="danger"
                type="button"
                disabled={deleteLoading || isPending}
                onClick={async () => {
                  setPreview(null);
                  await deleteAvatar();
                  form.reset({ avatar: null });
                  refetch();
                }}>
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          )
        }>
        <FormLabel
          className={`"dark:text-white mb-2 text-lg font-medium ${
            avatarError ? "text-danger" : ""
          }`}>
          پروفایل
        </FormLabel>
        <Controller
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                field.onChange(file);
                handleFileChange(file);
                e.target.value = "";
              }}
            />
          )}
        />
        <div
          className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden cursor-pointer group  mx-auto"
          onClick={() => fileInputRef.current?.click()}>
          <img
            src={preview || "/user.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <CameraIcon className="text-white w-7 h-7" />
          </div>
        </div>
        {avatarError && (
          <p className=" text-xs mt-2 text-danger text-right">{avatarError}</p>
        )}
      </FormComponent>
    </div>
  );
}

export default UserAvatar;
