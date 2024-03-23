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
      budgetEntry: {
        Row: {
          actual: number
          budgetEntryGroupId: string
          created_at: string
          id: string
          planned: number
          title: string | null
          userIds: string[]
        }
        Insert: {
          actual?: number
          budgetEntryGroupId: string
          created_at?: string
          id?: string
          planned?: number
          title?: string | null
          userIds: string[]
        }
        Update: {
          actual?: number
          budgetEntryGroupId?: string
          created_at?: string
          id?: string
          planned?: number
          title?: string | null
          userIds?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "public_budgetEntry_budgetEntryGroupId_fkey"
            columns: ["budgetEntryGroupId"]
            isOneToOne: false
            referencedRelation: "budgetEntryGroup"
            referencedColumns: ["id"]
          },
        ]
      }
      budgetEntryCategory: {
        Row: {
          created_at: string
          emoji: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          emoji?: string
          id?: string
          title?: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      budgetEntryGroup: {
        Row: {
          budgetEntryCategoryId: string | null
          budgetGroupId: string
          createdAt: string
          id: string
          title: string
          type: Database["public"]["Enums"]["entryType"]
          userId: string
          userIds: string[]
        }
        Insert: {
          budgetEntryCategoryId?: string | null
          budgetGroupId: string
          createdAt?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["entryType"]
          userId?: string
          userIds: string[]
        }
        Update: {
          budgetEntryCategoryId?: string | null
          budgetGroupId?: string
          createdAt?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["entryType"]
          userId?: string
          userIds?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "public_budgetEntryGroup_budgetEntryCategoryId_fkey"
            columns: ["budgetEntryCategoryId"]
            isOneToOne: false
            referencedRelation: "budgetEntryCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_budgetEntryGroup_budgetGroupId_fkey"
            columns: ["budgetGroupId"]
            isOneToOne: false
            referencedRelation: "budgetGroup"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_budgetEntryGroup_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      budgetGroup: {
        Row: {
          createdAt: string
          id: string
          month: string
          year: string
        }
        Insert: {
          createdAt?: string
          id?: string
          month?: string
          year?: string
        }
        Update: {
          createdAt?: string
          id?: string
          month?: string
          year?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatarPath: string | null
          created_at: string
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          avatarPath?: string | null
          created_at?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Update: {
          avatarPath?: string | null
          created_at?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      relationship: {
        Row: {
          created_at: string
          id: string
          userIds: string[]
        }
        Insert: {
          created_at?: string
          id?: string
          userIds: string[]
        }
        Update: {
          created_at?: string
          id?: string
          userIds?: string[]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      entryType: "debit" | "credit"
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
