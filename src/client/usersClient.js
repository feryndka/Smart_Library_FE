import client from "./apiClient";

export const getUsers = () => {
  return client.get("/api/users")
}

export const postUsers = (body) => {
  return client.post("/api/users", body)
}

export const updateUsers = (body) => {
  return client.put("/api/users", body)
}

export const deleteUsers = (userId) => {
  return client.delete("/api/users", userId)
}