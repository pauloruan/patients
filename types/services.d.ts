interface GetDashboardDataResponse extends DashboardData {}

interface PostPatientRequest {
  name: string
  email: string
  age: number
  diagnosis: string
  notes?: string | undefined
}

interface PutPatientRequest extends PostPatientRequest {
  id: string
}

interface PatientResponse {
  message: string
}
