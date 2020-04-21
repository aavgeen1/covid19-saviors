export type Errormessage = { field: string; message: string };

export type PickupLocation = {
  latitude: string;
  longitude: string;
};

export type ItemType = {
  cookedMeals: boolean;
  groceries: boolean;
  supplies: boolean;
};
