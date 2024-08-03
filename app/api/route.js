import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { encrypt } from "@/lib/cryptography";

export async function POST(request) {
    const client = await clientPromise;

    const input = await request.json();

    const { id1, id2, id3 } = input;

    const horcrux = encrypt(id1.split("_")[1], `${id2.split("_")[1]}${id3.split('_')[1]}`)

    try {
        const db = await client.db("auth_db");
        const keys = await db.collection('key_collection');
        const documents = await keys.find({ 'user': id1 }).toArray();

        if (documents.length == 0) {
            const res = await keys.insertOne({
                user: id1,
                horcrux: horcrux
            })

            return NextResponse.json(
                { response: 'S-01' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { response: 'S-02' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { response: `E-01` },
            { status: 200 }
        );
    }
}