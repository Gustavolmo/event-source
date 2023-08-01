'use server'
import { EventData, User } from "@/app-types/types"
import { runMongoDb } from "./mongoConnect"

runMongoDb()

export const createNewEvent = (userEmail: User['email'], event: EventData ) => {
  console.log(event)
}