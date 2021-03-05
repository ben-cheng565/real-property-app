export interface IPropertyBase {
  ID: number;
  Name: string;
  PType: string;
  FType: string;
  Price: number;
  SellOrRent: number;
  Bedroom: number;
  Bathroom: number;
  Parking: number;
  BuildArea: number;
  LandArea: number;
  Address: string;
  Suburb: string;
  City: string;
  Image?: string;
}
