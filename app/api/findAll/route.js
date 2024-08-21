import { NextResponse } from "next/server";
import db from "@/lib/firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { decrypt } from "@/lib/cryptography";
import clientPromise from "@/lib/db";

export async function POST(request) {
    // destructure collection name
    const input = await request.json();
    const { collectionName } = input

    // get key
    const client = await clientPromise;
    const mongo = await client.db("auth_db");
    const keys = await mongo.collection('key_collection');
    const documents = await keys.find({ 'user': collectionName }).toArray();
    const key = documents[0]['horcrux']

    // get all the saved passwords from db
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const output = []

    querySnapshot.forEach((doc) => {
        let id = doc.id;
        let { site, name, username, cypherText, note } = doc.data();
        output.push({
            id, site, name, username, password: decrypt(cypherText, key), note
        })
    });

    return NextResponse.json(
        { response: output },
        { status: 200 }
    );
}