const { VITE_BACKEND_URL } = import.meta.env

const api = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> => {
  try {
    const { method = 'GET', headers, body, ...rest } = options

    const res = await fetch(`${VITE_BACKEND_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...(method !== 'GET' && body ? { body } : {}),
      ...rest
    })

    if (!res.ok) throw new Error(`Error en la API: ${res.status}`)

    return await res.json()
  } catch (error) {
    console.error('Error en api: ', error)
    throw error
  }
}

export default api
