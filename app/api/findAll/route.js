import { NextResponse } from "next/server";
import db from "@/lib/firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";

export async function POST(request) {
    // destructure collection name
    const input = await request.json();
    const { collectionName } = input

    // get all the saved passwords from db
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const output = []

    querySnapshot.forEach((doc) => {
        let id = doc.id;
        let { site, name, username, note } = doc.data();
        output.push({
            id, site, name, username, note
        })
    });

    return NextResponse.json(
        { response: output },
        { status: 200 }
    );
}