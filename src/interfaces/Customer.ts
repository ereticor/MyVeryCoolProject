export default interface ICustomer {
  id: string | number;
  name: string;
  status: { value: number; description: string };
  createdAt: string;
  createdByName: string;
  lastModifiedAt: string;
  lastModifiedByName: string;
  sapCode: string | number | null;
  [key: string]: string | number | null | Record<string, unknown>;
}
