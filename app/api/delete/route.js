import { NextResponse } from "next/server";
import db from "@/lib/firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export async function POST(request) {
    const input = await request.json();
    const { wizard, cloak } = input

    try {
        await deleteDoc(doc(db, wizard, cloak));
        
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