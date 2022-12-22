export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      container: {
        Row: {
          id: number
          name: string
          location_id: number | null
          created_at: string | null
          image: string | null
        }
        Insert: {
          id?: number
          name: string
          location_id?: number | null
          created_at?: string | null
          image?: string | null
        }
        Update: {
          id?: number
          name?: string
          location_id?: number | null
          created_at?: string | null
          image?: string | null
        }
      }
      container_tag: {
        Row: {
          container_id: number
          tag_id: number
        }
        Insert: {
          container_id: number
          tag_id: number
        }
        Update: {
          container_id?: number
          tag_id?: number
        }
      }
      item: {
        Row: {
          id: number
          name: string
          description: string | null
          container_id: number
          created_at: string | null
          image: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          container_id: number
          created_at?: string | null
          image?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          container_id?: number
          created_at?: string | null
          image?: string | null
        }
      }
      location: {
        Row: {
          id: number
          name: string
          street: string | null
          city: string | null
          zip_code: string | null
          created_at: string | null
          image: string | null
        }
        Insert: {
          id?: number
          name: string
          street?: string | null
          city?: string | null
          zip_code?: string | null
          created_at?: string | null
          image?: string | null
        }
        Update: {
          id?: number
          name?: string
          street?: string | null
          city?: string | null
          zip_code?: string | null
          created_at?: string | null
          image?: string | null
        }
      }
      tag: {
        Row: {
          id: number
          name: string
          created_at: string | null
        }
        Insert: {
          id?: number
          name: string
          created_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
