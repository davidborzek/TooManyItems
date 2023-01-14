import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Database } from './types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseKey;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage,
  },
});

export type ContainerInsert =
  Database['public']['Tables']['container']['Insert'];

export type Container = Database['public']['Tables']['container']['Row'];

export type Location = Database['public']['Tables']['location']['Row'];

export type LocationInsert = Database['public']['Tables']['location']['Insert'];

export type Item = Database['public']['Tables']['item']['Row'];

export type ItemInsert = Database['public']['Tables']['item']['Insert'];

/**
 * Hole alle Container aus der Datenbank die für den angemeldeten Benutzer verfügbar sind.
 */
export async function fetchContainers(): Promise<Container[]> {
  const result = await supabase.from('container').select('*').order('name');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

/**
 * Hole einen bestimmten Container aus der Datenbank.
 */
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

/**
 * Hole alle Orte aus der Datenbank die für den angemeldeten Benutzer verfügbar sind.
 */
export async function fetchLocations(): Promise<Location[]> {
  const result = await supabase.from('location').select('*').order('name');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

/**
 * Hole alle Container aus der Datenbank welche in einem bestimmten Ort liegen.
 */
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

/**
 * Hole alle Items aus der Datenbank welche in einem bestimmten Container liegen.
 */
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

/**
 * Hole einen bestimmten Ort aus der Datenbank.
 */
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

/**
 * Änderung eines bestimmten Containers anhand seiner id.
 */
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

/**
 * Änderung eines bestimmten Items anhand seiner id.
 */
export async function updateItem(item: ItemInsert): Promise<void> {
  const result = await supabase.from('item').update(item).eq('id', item.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Änderung eines bestimmten Ortes anhand seiner id.
 */
export async function updateLocation(location: LocationInsert): Promise<void> {
  const result = await supabase
    .from('location')
    .update(location)
    .eq('id', location.id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Insert Funktion für ein Container.
 */
export async function insertContainer(
  container: ContainerInsert
): Promise<void> {
  const result = await supabase.from('container').insert(container);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Insert Funktion für ein Item.
 */
export async function insertItem(item: ItemInsert): Promise<void> {
  const result = await supabase.from('item').insert(item);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Insert Funktion für einen Ort.
 */
export async function insertLocation(location: LocationInsert): Promise<void> {
  const result = await supabase.from('location').insert(location);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Such Funktion für einen Items auf die der Nutzer Zugriff hat.
 */
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

/**
 * Such Funktion für einen Container auf die der Nutzer Zugriff hat.
 */
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

/**
 * Such Funktion für einen Orte auf die der Nutzer Zugriff hat.
 */
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

/**
 * Lösch Funktion für einen Container.
 */
export async function deleteContainer(id: number) {
  const result = await supabase.from('container').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Lösch Funktion für einen Ort.
 */
export async function deleteLocation(id: number) {
  const result = await supabase.from('location').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}

/**
 * Lösch Funktion für ein Item.
 */
export async function deleteItem(id: number) {
  const result = await supabase.from('item').delete().eq('id', id);
  if (result.error != null) {
    throw new Error(result.error.message);
  }
}
