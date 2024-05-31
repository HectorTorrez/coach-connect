export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      coach_exercise: {
        Row: {
          coach_template_id: string
          created_at: string
          id: string
          metric: string
          name: string
          order: number
          user_id: string
        }
        Insert: {
          coach_template_id?: string
          created_at?: string
          id?: string
          metric: string
          name: string
          order: number
          user_id?: string
        }
        Update: {
          coach_template_id?: string
          created_at?: string
          id?: string
          metric?: string
          name?: string
          order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_exercise_coach_template_id_fkey"
            columns: ["coach_template_id"]
            isOneToOne: false
            referencedRelation: "coach_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_sets: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          reps: number
          set: number
          user_id: string
          weigh: number
        }
        Insert: {
          created_at?: string
          exercise_id?: string
          id?: string
          reps: number
          set: number
          user_id?: string
          weigh: number
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          reps?: number
          set?: number
          user_id?: string
          weigh?: number
        }
        Relationships: [
          {
            foreignKeyName: "coach_sets_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "coach_exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_templates: {
        Row: {
          coach_workout: string
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          coach_workout: string
          created_at?: string
          id?: string
          name: string
          user_id?: string
        }
        Update: {
          coach_workout?: string
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_templates_coach_workout_fkey"
            columns: ["coach_workout"]
            isOneToOne: false
            referencedRelation: "coach_workout"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_workout: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      exercise: {
        Row: {
          created_at: string
          id: string
          metric: string
          name: string
          order: number
          template_id: string
        }
        Insert: {
          created_at: string
          id?: string
          metric: string
          name: string
          order: number
          template_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metric?: string
          name?: string
          order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "template"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_list: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          role: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          role?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          role?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      friends: {
        Row: {
          created_at: string
          reciever_id: string
          sender_id: string
          status: Database["public"]["Enums"]["friends_enum"]
          user_id: string
        }
        Insert: {
          created_at?: string
          reciever_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["friends_enum"]
          user_id?: string
        }
        Update: {
          created_at?: string
          reciever_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["friends_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_reciever_id_fkey"
            columns: ["reciever_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friends_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reusable_exercise: {
        Row: {
          created_at: string
          id: string
          name: string
          template_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          template_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reusable_exercise_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "reusables_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      reusables_templates: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      sets: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          reps: number
          set: number
          weight: number
        }
        Insert: {
          created_at: string
          exercise_id: string
          id?: string
          reps: number
          set: number
          weight: number
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          reps?: number
          set?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "sets_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
        ]
      }
      template: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_routine: {
        Row: {
          created_at: string
          id: string
          routine_id: string
          user_id: string
          userID: string
        }
        Insert: {
          created_at?: string
          id?: string
          routine_id?: string
          user_id?: string
          userID: string
        }
        Update: {
          created_at?: string
          id?: string
          routine_id?: string
          user_id?: string
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_routine_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "coach_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_routine_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          external_id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          external_id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          external_id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      friends_enum: "pending" | "accepted" | "rejected"
      user_role: "coach" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
