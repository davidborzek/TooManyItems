// Wir verwenden supabase als backend. Hier sind alle Types der Postgres Datenbank festgehalten.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      container: {
        Row: {
          created_at: string | null;
          id: number;
          image: string | null;
          location_id: number | null;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          image?: string | null;
          location_id?: number | null;
          name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          image?: string | null;
          location_id?: number | null;
          name?: string;
          user_id?: string;
        };
      };
      item: {
        Row: {
          container_id: number;
          created_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          name: string;
          user_id: string;
        };
        Insert: {
          container_id: number;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          name: string;
          user_id?: string;
        };
        Update: {
          container_id?: number;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          user_id?: string;
        };
      };
      location: {
        Row: {
          city: string | null;
          created_at: string | null;
          id: number;
          image: string | null;
          name: string;
          street: string | null;
          user_id: string;
          zip_code: string | null;
        };
        Insert: {
          city?: string | null;
          created_at?: string | null;
          id?: number;
          image?: string | null;
          name: string;
          street?: string | null;
          user_id?: string;
          zip_code?: string | null;
        };
        Update: {
          city?: string | null;
          created_at?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          street?: string | null;
          user_id?: string;
          zip_code?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
