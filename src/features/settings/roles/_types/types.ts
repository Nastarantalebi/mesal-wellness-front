export type TRequest = {
  name: string;
  widgets: {
    id: number;
    enabled: boolean;
    order: number;
    config: {
      color: string;
    };
  }[];
};
