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
          emoji: string | null
          id: string
          planned: number
          title: string | null
          userIds: string[]
        }
        Insert: {
          actual?: number
          budgetEntryGroupId: string
          created_at?: string
          emoji?: string | null
          id?: string
          planned?: number
          title?: string | null
          userIds: string[]
        }
        Update: {
          actual?: number
          budgetEntryGroupId?: string
          created_at?: string
          emoji?: string | null
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
          }
        ]
      }
      budgetEntryGroup: {
        Row: {
          budgetGroupId: string
          createdAt: string
          id: string
          title: string
          type: Database["public"]["Enums"]["entryType"]
          userIds: string[]
        }
        Insert: {
          budgetGroupId: string
          createdAt?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["entryType"]
          userIds: string[]
        }
        Update: {
          budgetGroupId?: string
          createdAt?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["entryType"]
          userIds?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "public_budgetEntryGroup_budgetGroupId_fkey"
            columns: ["budgetGroupId"]
            isOneToOne: false
            referencedRelation: "budgetGroup"
            referencedColumns: ["id"]
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
