export type TDataSmsLogs = {
  is_success: boolean;
  message: string;
  code: number;
  data: TData;
};
export type TData = {
  id: number;
  message: string;
  sms_parts: number;
  delivery_status_label: string;
  status_updated_at: string | null;
  sms_length: number;
  type: string;
};
