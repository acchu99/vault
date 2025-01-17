// mongodb.js

import { MongoClient } from 'mongodb'
import { getRequiredEnvVar } from "@/lib/getEnv"


const uri = getRequiredEnvVar("MONGODB_URI")
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!getRequiredEnvVar("MONGODB_URI")) {
  throw new Error('Add Mongo URI to .env.local')
}

if (getRequiredEnvVar("NODE_ENV") === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise