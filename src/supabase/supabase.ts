import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from './types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ""
const supabaseAnonKey = ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage as any,
  },
});

export type ContainerInsert =
  Database['public']['Tables']['container']['Insert'];

export type Container = Database['public']['Tables']['container']['Row'];

export type Location = Database['public']['Tables']['location']['Row'];

export type LocationInsert = Database['public']['Tables']['location']['Insert'];

export type Item = Database['public']['Tables']['item']['Row'];

export type ItemInsert = Database['public']['Tables']['item']['Insert'];

export async function fetchContainers(): Promise<Container[]> {
  const result = await supabase.from('container').select('*').order('name');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchContainer(containerId: number): Promise<Container> {
  const result = await supabase
    .from('container')
    .select('*')
    .eq('id', containerId)
    .single();

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

export async function fetchContainersForLocation(
  locationId: number
): Promise<Container[]> {
  const result = await supabase
    .from('container')
    .select('*')
    .eq('location_id', locationId);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchItemsForContainer(
  containerId: number
): Promise<Item[]> {
  const result = await supabase
    .from('item')
    .select('*')
    .eq('container_id', containerId);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchLocation(id: number): Promise<Location> {
  const result = await supabase
    .from('location')
    .select('*')
    .eq('id', id)
    .single();

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function updateContainer(
  container: ContainerInsert
): Promise<void> {
  const result = await supabase
    .from('container')
    .update(container)
    .eq('id', container.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function updateItem(item: ItemInsert): Promise<void> {
  const result = await supabase.from('item').update(item).eq('id', item.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function updateLocation(location: LocationInsert): Promise<void> {
  const result = await supabase
    .from('location')
    .update(location)
    .eq('id', location.id);
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

export async function insertItem(item: ItemInsert): Promise<void> {
  const result = await supabase.from('item').insert(item);
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

export async function searchItems(q: string): Promise<Item[]> {
  // TODO: use textSearch maybe
  const result = await supabase
    .from('item')
    .select('*')
    .ilike('name', `%${q}%`)
    .limit(20);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function searchContainers(q: string): Promise<Container[]> {
  // TODO: use textSearch maybe
  const result = await supabase
    .from('container')
    .select('*')
    .ilike('name', `%${q}%`)
    .limit(20);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function searchLocations(q: string): Promise<Location[]> {
  // TODO: use textSearch maybe
  const result = await supabase
    .from('location')
    .select('*')
    .ilike('name', `%${q}%`)
    .limit(20);

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteContainer(id: number) {
  const result = await supabase.from('container').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function deleteLocation(id: number) {
  const result = await supabase.from('location').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

export async function deleteItem(id: number) {
  const result = await supabase.from('item').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}
