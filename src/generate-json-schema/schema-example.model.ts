export type ExampleInterface = {
  name: string;
  id: number;
  location: Address;
  children?: Children[] | null;
};

export type Address = {
  street: string;
  city: string;
};

export type Children = {
  name: string;
  id: number;
};
