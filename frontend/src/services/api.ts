const { VITE_BACKEND_URL } = import.meta.env

const api = async <T = unknown>(endpoint: string): Promise<T | null> => {
  try {
    const res = await fetch(`${VITE_BACKEND_URL}${endpoint}`)

    if (!res.ok) throw new Error(`Error en la API: ${res.status}`)

    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default api
