"use client"

import React, { createContext, useReducer } from 'react'

/**
 * I got this session props from auth.js
 */
export type TSession = {
  expires: Date
  sessionToken: string
  user: {
    id: string
    name: string
    email: string
    image: string
  }
}

type TSessionDataContext = {
  session: TSessionState,
  dispatch: React.Dispatch<TSessionAction>
}

// Define session context.
export const SessionDataContext = createContext<TSessionDataContext | null>(null)


// Context provider.
type TSessionState = TSession | null
const initialState: TSessionState = null
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, dispatch] = useReducer(sessionReducer, initialState);

  return (
    <SessionDataContext.Provider value={{ session, dispatch}}>
      {children}
    </SessionDataContext.Provider>
  )
}

export default SessionProvider


// Reducer function
type TSignInAction = {
  type: "signIn"
  payload: TSession 
}

type TSignOutAction = {
  type: "signOut"
}

type TSessionAction = TSignInAction | TSignOutAction

const sessionReducer = (session: TSessionState, action: TSessionAction) => {
  console.log("Inside reducer", session)
  switch (action.type) {
    case 'signIn': {
      return action.payload
    }
    case 'signOut': {
      return null
    }
    default: {
      console.log("Unkown session action")
      throw new Error("Unkown session action")
    }
  }
}

