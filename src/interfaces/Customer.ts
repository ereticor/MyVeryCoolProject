export default interface ICustomer {
  id: string | number;
  name: string;
  status: { value: number; description: string };
  createdAt: string;
  createdByName: string;
  updatedAt: string;
  updatedByName: string;
  sapCode: number | null;
  [key: string]: string | number | null | Record<string, unknown>;
}
