import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = ""
const supabaseAnonKey = ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type ContainerInsert =
  Database['public']['Tables']['container']['Insert'];

export type Container = Database['public']['Tables']['container']['Row'];

export type Location = Database['public']['Tables']['location']['Row'];

export type LocationInsert = Database['public']['Tables']['location']['Insert'];

export type Item = Database['public']['Tables']['item']['Row']

export async function fetchContainers(): Promise<Container[]> {
  const result = await supabase.from('container').select('*').order('name');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchLocations(): Promise<Location[]> {
  const result = await supabase.from('location').select('*').order('name');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchContainersForLocation(location_id: number): Promise<Container[]> {
  const result = await supabase.from('container').select('*').eq('location_id', location_id);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchItemsForContainer(container_id: number): Promise<Item[]> {
  const result = await supabase.from('item').select('*').eq('container_id', container_id);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchLocation(id: number): Promise<Location> {
  const result = await supabase.from('location').select('*').eq('id', id).single();

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function updateContainer(
  container: ContainerInsert
): Promise<void> {
  const result = await supabase.from('container').update(container).eq('id', container.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function updateLocation(
  location: LocationInsert
): Promise<void> {
  const result = await supabase.from('location').update(location).eq('id', location.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function insertContainer(
  container: ContainerInsert
): Promise<void> {
  const result = await supabase.from('container').insert(container);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function insertLocation(location: LocationInsert): Promise<void> {
  const result = await supabase.from('location').insert(location);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}
