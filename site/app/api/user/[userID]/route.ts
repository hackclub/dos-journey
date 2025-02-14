// GET api/user/[userID]
// Returns information about a user 

import Airtable from 'airtable';
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { encryptSession, verifySession } from '@/utils/hash'

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!)

async function getUser(emailAddress: string, accessTokenEncrypted: string){
    const recordID = await airtable("Registered Users").select({
        filterByFormula: `{email} = "${emailAddress}"`,
        maxRecords: 1,
        fields: ["hashed_token", "current_stage"]
    }).all()


    const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank

    try { 
        if (!(verifySession(prettyRecordID[0]["fields"]["hashed_token"], accessTokenEncrypted))){
            throw "Unauthorized"
        }
        return prettyRecordID[0]["fields"]["current_stage"]
    } catch(error) {
        console.error(error)
    }
}


export async function GET(request: Request) {
    const session = await auth();
    const emailAddress = session!.user.email!
    const encryptedToken = encryptSession(session!.access_token!, process.env.AUTH_SECRET!)
    try {
        const response = await getUser(emailAddress, encryptedToken);
        return NextResponse.json({message: response}, {status: 200})
    } catch {
        return NextResponse.json({error: "Something went wrong."}, {status: 400})

    }
}
