import type { TLoginSchema } from "@/lib/zod-schema/login-schema"
import type { TSession } from "@/providers/session-provider"


export const useLogin = () => {

  const login = async (loginData: TLoginSchema) => {

    try {
      const response = await fetch("http://192.168.100.165:3005/api/auth/local/login", {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      if (!response.ok) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)      
      }

      // Expects session.
      const session: TSession = await response.json()
      return session
    } 
    catch (error: unknown) {
      throw error
    }        
  }

  return { login }
}