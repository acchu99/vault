import { NextResponse } from "next/server";
import db from "@/lib/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { decrypt } from "@/lib/cryptography";
import clientPromise from "@/lib/db";

export async function POST(request) {
    // destructure collection name
    const input = await request.json();
    const { collectionName, id } = input

    // get all the saved passwords from db
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const { site, name, cypherText, username, note } = docSnap.data()

        // get key
        const client = await clientPromise;
        const mongo = await client.db("auth_db");
        const keys = await mongo.collection('key_collection');
        const documents = await keys.find({ 'user': collectionName }).toArray();
        const key = documents[0]['horcrux']

        const output = {
            id, 
            site, 
            name, 
            username, 
            note, 
            password: decrypt(cypherText, key)
        }

        return NextResponse.json(
            { response: output },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            {
                response: {
                    id: null,
                    site: null,
                    name: null,
                    username: null,
                    note: null,
                    password: null
                }
            },
            { status: 200 }
        );
    }

}