import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById, TReqTherapists } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function TherapistsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: selectedRecord,
  });
  const { data: dataById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, selectedRecord],
    id: selectedRecord,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const praparedData: TReqTherapists = {
        first_name: dataById.therapist.user.first_name,
        last_name: dataById.therapist.user.last_name,
        national_code: dataById.therapist.user.national_code,
        bio: dataById.therapist.bio,
        mobile: dataById.therapist.user.mobile,
        gender: dataById.therapist.user.gender,
        avatar_path: dataById.therapist.avatar_path ?? "",
        status: dataById.therapist.status,
        facility_id: dataById.therapist.facility.id,
        license_number: dataById.therapist.license_number,
        hire_date: dataById.therapist.hire_date,
        specialties: dataById.therapist.specialties,
      };
      form.reset(praparedData);
    }
  }, [form, dataById]);
  const { fields } = useFormData();
  return (
    <FormComponent
      form={form}
      onSubmit={(values) => {
        const action = selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/therapists") });
      }}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default TherapistsForm;
