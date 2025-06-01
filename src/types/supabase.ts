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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          profile_picture?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          profile_picture?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          school: string
          grade: string
          birth_date?: string
          story?: string
          goals?: string
          funding_needed: number
          funding_received: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          school: string
          grade: string
          birth_date?: string
          story?: string
          goals?: string
          funding_needed: number
          funding_received?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          school?: string
          grade?: string
          birth_date?: string
          story?: string
          goals?: string
          funding_needed?: number
          funding_received?: number
          created_at?: string
          updated_at?: string
        }
      }
      funds: {
        Row: {
          id: string
          donor_id: string
          student_id: string
          amount: number
          status: string
          monitoring_agent_id?: string
          notes?: string
          purpose?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          donor_id: string
          student_id: string
          amount: number
          status?: string
          monitoring_agent_id?: string
          notes?: string
          purpose?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          donor_id?: string
          student_id?: string
          amount?: number
          status?: string
          monitoring_agent_id?: string
          notes?: string
          purpose?: string
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
          release_date?: string
          batch: number
          monitoring_report?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          fund_id: string
          amount: number
          status?: string
          release_date?: string
          batch: number
          monitoring_report?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          fund_id?: string
          amount?: number
          status?: string
          release_date?: string
          batch?: number
          monitoring_report?: string
          created_at?: string
          updated_at?: string
        }
      }
      monitoring_reports: {
        Row: {
          id: string
          fund_id: string
          disbursement_id: string
          monitoring_agent_id: string
          content: string
          status: string
          attachments?: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          fund_id: string
          disbursement_id: string
          monitoring_agent_id: string
          content: string
          status?: string
          attachments?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          fund_id?: string
          disbursement_id?: string
          monitoring_agent_id?: string
          content?: string
          status?: string
          attachments?: string[]
          created_at?: string
          updated_at?: string
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