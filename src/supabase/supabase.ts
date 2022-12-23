import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = 'https://tsesxmazyxwevsyqaikv.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZXN4bWF6eXh3ZXZzeXFhaWt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDAwNTI1NCwiZXhwIjoxOTg1NTgxMjU0fQ.wlQoPjj8VWU5xmJ_fYaj-QBJK-XgM_Jge1zs0NJBMVU';

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

export async function fetchContainers(): Promise<Container[]> {
  const result = await supabase.from('container').select('*');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function fetchLocations(): Promise<Location[]> {
  const result = await supabase.from('location').select('*');

  if (result.error != null) {
    throw new Error(result.error.message);
  }

  return result.data;
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
