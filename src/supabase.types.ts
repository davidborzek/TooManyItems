export interface Container {
  id: number;
  name: string;
  location_id: number;
  created_at: string;
  image: string;
}

export interface Location {
  id: number;
  name: string;
  street: string;
  city: string;
  zip_code: string;
  created_at: string;
  image: string;
}
