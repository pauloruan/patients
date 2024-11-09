enum UserStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  INACTIVE = "INACTIVE",
}

enum TherapyStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  NOT_PAID = "NOT_PAID",
  CANCELED = "CANCELED",
}

enum Local {
  ONLINE = "ONLINE",
  PRESENCIAL = "PRESENCIAL"
}

interface User {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string
  createdAt: string
  status: UserStatus
}

interface Psychologist {
  id: string
  userId: string
}

interface Patient {
  id: string
  name: string
  age: number
  email: string
  notes?: string | undefined
  diagnosis: string
  status: UserStatus
  createdAt: string
  psychologistId: string
}

interface PatientContent {
  count: number
  data: Patient[]
}

interface Event {
  id: string
  patientId: string
  psychologistId: string
  date: string
  duration: number
  basePrice: string
  discountPercentage: number
  status: string
  payment: string
  local: string
  createdAt: string
}

interface Patients {
  all: PatientContent
  active: PatientContent
  archived: PatientContent
}

interface DashboardData {
  user: User
  psychologist: Psychologist
  patients: Patients
  events: Event[]
}
