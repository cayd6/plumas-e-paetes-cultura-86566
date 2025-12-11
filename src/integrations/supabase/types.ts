export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          id: string
          key: string
          type: string
          updated_at: string
          value_en: string
          value_pt: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          type?: string
          updated_at?: string
          value_en?: string
          value_pt?: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          type?: string
          updated_at?: string
          value_en?: string
          value_pt?: string
        }
        Relationships: []
      }
      award_curiosities: {
        Row: {
          created_at: string
          display_order: number
          icon: string
          id: string
          text_en: string
          text_pt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          text_en: string
          text_pt: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          text_en?: string
          text_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      award_professionals: {
        Row: {
          awards_count: number
          created_at: string
          id: string
          name: string
          rank: number
          updated_at: string
        }
        Insert: {
          awards_count?: number
          created_at?: string
          id?: string
          name: string
          rank: number
          updated_at?: string
        }
        Update: {
          awards_count?: number
          created_at?: string
          id?: string
          name?: string
          rank?: number
          updated_at?: string
        }
        Relationships: []
      }
      award_schools: {
        Row: {
          awards_count: number
          created_at: string
          id: string
          name: string
          rank: number
          updated_at: string
        }
        Insert: {
          awards_count?: number
          created_at?: string
          id?: string
          name: string
          rank: number
          updated_at?: string
        }
        Update: {
          awards_count?: number
          created_at?: string
          id?: string
          name?: string
          rank?: number
          updated_at?: string
        }
        Relationships: []
      }
      award_stats: {
        Row: {
          created_at: string
          display_order: number
          id: string
          key: string
          label_en: string
          label_pt: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          key: string
          label_en?: string
          label_pt?: string
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          key?: string
          label_en?: string
          label_pt?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name_en: string
          name_pt: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_en: string
          name_pt: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name_en?: string
          name_pt?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category_id: string | null
          content_en: string
          content_pt: string
          created_at: string
          excerpt_en: string | null
          excerpt_pt: string | null
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title_en: string
          title_pt: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content_en: string
          content_pt: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_pt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title_en: string
          title_pt: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content_en?: string
          content_pt?: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_pt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_photos: {
        Row: {
          created_at: string
          created_by: string | null
          display_order: number
          id: string
          image_url: string
          rotation: number | null
          storage_path: string
          title: string
          type: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          display_order: number
          id?: string
          image_url: string
          rotation?: number | null
          storage_path: string
          title: string
          type: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          image_url?: string
          rotation?: number | null
          storage_path?: string
          title?: string
          type?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      gallery_videos: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number
          id: string
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string | null
          video_url: string
          year: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          thumbnail_url?: string | null
          title: string
          type?: string
          updated_at?: string | null
          video_url: string
          year: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          video_url?: string
          year?: string
        }
        Relationships: []
      }
      magazine_editions: {
        Row: {
          cover_url: string | null
          created_at: string
          description_en: string | null
          description_pt: string | null
          display_order: number
          id: string
          pages: string[] | null
          title_en: string
          title_pt: string
          updated_at: string
          year: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description_en?: string | null
          description_pt?: string | null
          display_order?: number
          id?: string
          pages?: string[] | null
          title_en: string
          title_pt: string
          updated_at?: string
          year: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description_en?: string | null
          description_pt?: string | null
          display_order?: number
          id?: string
          pages?: string[] | null
          title_en?: string
          title_pt?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          created_at: string
          description_en: string
          description_pt: string
          display_order: number
          id: string
          image_url: string | null
          title_en: string
          title_pt: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          description_en: string
          description_pt: string
          display_order?: number
          id?: string
          image_url?: string | null
          title_en: string
          title_pt: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_pt?: string
          display_order?: number
          id?: string
          image_url?: string | null
          title_en?: string
          title_pt?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description_en: string
          description_pt: string
          display_order: number
          features_en: string[] | null
          features_pt: string[] | null
          icon: string
          id: string
          title_en: string
          title_pt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en: string
          description_pt: string
          display_order?: number
          features_en?: string[] | null
          features_pt?: string[] | null
          icon?: string
          id?: string
          title_en: string
          title_pt: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_pt?: string
          display_order?: number
          features_en?: string[] | null
          features_pt?: string[] | null
          icon?: string
          id?: string
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_banners: {
        Row: {
          created_at: string
          created_by: string | null
          description_en: string | null
          description_pt: string | null
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          link: string | null
          storage_path: string | null
          title_en: string
          title_pt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description_en?: string | null
          description_pt?: string | null
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          link?: string | null
          storage_path?: string | null
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description_en?: string | null
          description_pt?: string | null
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          link?: string | null
          storage_path?: string | null
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          label_en: string
          label_pt: string
          type: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          label_en?: string
          label_pt?: string
          type?: string
          updated_at?: string
          value?: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          label_en?: string
          label_pt?: string
          type?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string | null
          name: string
          quote_en: string
          quote_pt: string
          role_en: string
          role_pt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          name: string
          quote_en: string
          quote_pt: string
          role_en: string
          role_pt: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          name?: string
          quote_en?: string
          quote_pt?: string
          role_en?: string
          role_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      timeline_events: {
        Row: {
          created_at: string
          description_en: string
          description_pt: string
          display_order: number
          id: string
          image_url: string | null
          title_en: string
          title_pt: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          description_en: string
          description_pt: string
          display_order?: number
          id?: string
          image_url?: string | null
          title_en: string
          title_pt: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_pt?: string
          display_order?: number
          id?: string
          image_url?: string | null
          title_en?: string
          title_pt?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
