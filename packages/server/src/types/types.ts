export type Errormessage = { field: string; message: string };

export type PickupLocation = {
  type: string;
  coordinates: number[];
};

export type ItemType = {
  cookedMeals: boolean;
  groceries: boolean;
  supplies: boolean;
};
