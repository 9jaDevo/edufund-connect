export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          profile_picture?: string
          is_verified: boolean
          monitoring_area?: Json
          created_at: string
          updated_at: string
          reputation_score: number
          preferred_language: string
          country?: string
          city?: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          profile_picture?: string
          is_verified?: boolean
          monitoring_area?: Json
          created_at?: string
          updated_at?: string
          reputation_score?: number
          preferred_language?: string
          country?: string
          city?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          profile_picture?: string
          is_verified?: boolean
          monitoring_area?: Json
          created_at?: string
          updated_at?: string
          reputation_score?: number
          preferred_language?: string
          country?: string
          city?: string
        }
      }
      projects: {
        Row: {
          id: string
          ngo_id: string
          title: string
          description: string
          location: string
          budget: number
          status: string
          project_type: string
          beneficiaries_count: number
          start_date?: string
          end_date?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ngo_id: string
          title: string
          description: string
          location: string
          budget: number
          status?: string
          project_type: string
          beneficiaries_count: number
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ngo_id?: string
          title?: string
          description?: string
          location?: string
          budget?: number
          status?: string
          project_type?: string
          beneficiaries_count?: number
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_categories: {
        Row: {
          id: string
          name: string
          description?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
      project_categories_map: {
        Row: {
          project_id: string
          category_id: string
        }
        Insert: {
          project_id: string
          category_id: string
        }
        Update: {
          project_id?: string
          category_id?: string
        }
      }
      project_donations: {
        Row: {
          id: string
          project_id: string
          donor_id: string
          amount: number
          status: string
          escrow_status: string
          message?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          donor_id: string
          amount: number
          status?: string
          escrow_status?: string
          message?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          donor_id?: string
          amount?: number
          status?: string
          escrow_status?: string
          message?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_reports: {
        Row: {
          id: string
          project_id: string
          monitoring_agent_id: string
          stage: number
          content: string
          status: string
          photos?: string[]
          location_lat?: number
          location_long?: number
          submitted_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          monitoring_agent_id: string
          stage: number
          content: string
          status?: string
          photos?: string[]
          location_lat?: number
          location_long?: number
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          monitoring_agent_id?: string
          stage?: number
          content?: string
          status?: string
          photos?: string[]
          location_lat?: number
          location_long?: number
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      ngo_students: {
        Row: {
          ngo_id: string
          student_id: string
          status: string
          notes?: string
          created_at: string
        }
        Insert: {
          ngo_id: string
          student_id: string
          status?: string
          notes?: string
          created_at?: string
        }
        Update: {
          ngo_id?: string
          student_id?: string
          status?: string
          notes?: string
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id?: string
          action: string
          entity_type: string
          entity_id: string
          details?: Json
          ip_address?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          action: string
          entity_type: string
          entity_id: string
          details?: Json
          ip_address?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          details?: Json
          ip_address?: string
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      funds: {
        Row: {
          id: string
          amount: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amount: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          amount?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      disbursements: {
        Row: {
          id: string
          fund_id: string
          amount: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          fund_id: string
          amount: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          fund_id?: string
          amount?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      monitoring_reports: {
        Row: {
          id: string
          project_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          rater_id: string
          rated_id: string
          score: number
          comment?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          rater_id: string
          rated_id: string
          score: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          rater_id?: string
          rated_id?: string
          score?: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          type: string
          level: string
          criteria: Json
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          type: string
          level: string
          criteria: Json
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          type?: string
          level?: string
          criteria?: Json
          icon?: string
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          user_id: string
          badge_id: string
          awarded_at: string
        }
        Insert: {
          user_id: string
          badge_id: string
          awarded_at?: string
        }
        Update: {
          user_id?: string
          badge_id?: string
          awarded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}