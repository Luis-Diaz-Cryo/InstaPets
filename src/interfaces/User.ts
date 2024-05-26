import { Contact } from "./Contact"
import { Message } from "./message"

export interface User{
    userName:string,
    email:string,
    password:string
    VetMessages:Message[]
    contacts:Contact[]
}