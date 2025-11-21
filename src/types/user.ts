export interface User {
  id: string
  email: string
  full_name: string
  phone: string | null
  national_id: string | null
  is_active: boolean
  is_verified: boolean
  permissions: string[]
  created_at: string
  updated_at: string
}
