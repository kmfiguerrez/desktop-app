export const getErrorMessage = (error: unknown) => {
  let message = "Something went wrong"

  if (error instanceof TypeError) {
    if (error.message === "Failed to fetch") {
      message = "Web API server is down"
      return message
    }
  }
  
  return message
}
