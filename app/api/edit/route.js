import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { encrypt } from "@/lib/cryptography";
import db from "@/lib/firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(request) {
    const input = await request.json();
    const { wizard, cloak, site, name, username, password, note } = input

    try {
        const client = await clientPromise;
        const mongo = await client.db("auth_db");
        const keys = await mongo.collection('key_collection');
        const documents = await keys.find({ 'user': wizard }).toArray();
        const key = documents[0]['horcrux']

        const cypherText = encrypt(password, key)

        const docRef = doc(db, wizard, cloak);

        await updateDoc(docRef, {
            site,
            name,
            username,
            cypherText,
            note
        });
        
        return NextResponse.json(
            { response: 'success' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: 'unexpected error occurred', response: `Failure` },
            { status: 200 }
        );
    }
}