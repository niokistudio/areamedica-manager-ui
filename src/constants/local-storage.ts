import { createNamespacedStorage } from "@/utils/local-storage"

//  Storage keys
export const AUTH_STORAGE__KEY = "auth"
export const AuthLocalStorage = createNamespacedStorage(AUTH_STORAGE__KEY)

//  Item keys
export const AUTH_ACCESS_TOKEN_KEY = "access-token"
