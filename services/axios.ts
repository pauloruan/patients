import axios from "axios"

const client = axios.create({
  baseURL: "/api",
})

interface API {
  getDashboardData: () => Promise<GetDashboardDataResponse>
  createPatient: (patient: PostPatientRequest) => Promise<string>
  updatePatient: (patient: PutPatientRequest) => Promise<string>,
  createTherapy: (data: PostTherapyRequest) => Promise<string>
}

async function getDashboardData(): Promise<GetDashboardDataResponse> {
  const response = await client.get("/dashboard")
  return response.data
}

async function createPatient(patient: PostPatientRequest): Promise<string> {
  const response = await client.post("/patients", patient)
  return response.data
}

async function updatePatient(patient: PutPatientRequest): Promise<string> {
  const response = await client.put("/patients", patient)
  return response.data
}

async function createTherapy(data: PostTherapyRequest): Promise<string> {
  const response = await client.post("/therapies", data)
  return response.data
}

export const API: API = {
  getDashboardData,
  createPatient,
  updatePatient,
  createTherapy,
}
