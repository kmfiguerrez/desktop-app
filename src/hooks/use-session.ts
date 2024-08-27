import { useContext } from "react"

import { SessionDataContext } from "@/providers/session-provider"


// Custom hooks.
export const useSession = () => {
  const sessionContext = useContext(SessionDataContext)

  // Custom hooks can only be used inside the provider.
  if (!sessionContext) {
    throw new Error("useCurrentUserContext must be used inside CurrentUserProvider")
  }

  return sessionContext
}