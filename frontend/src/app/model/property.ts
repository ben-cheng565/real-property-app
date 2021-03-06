import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
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
  AvailableFrom: string;
  Age: number;
  Description: string;
  PostedOn: string;
}
