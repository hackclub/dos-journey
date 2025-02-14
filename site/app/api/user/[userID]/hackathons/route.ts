// GET api/user/[userID]/hackathons
// Returns a list of all the hackathons a user is involved in

import { NextResponse } from "next/server";
import Airtable from 'airtable';
import { auth } from '@/auth';
import { encryptSession, verifySession } from '@/utils/hash';

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)

// Get a list of hackathons the user is noted as attending
async function getHackathonStatus(emailAddress: string, accessTokenEncrypted: string){
    const recordID = await airtable("Registered Users").select({
        filterByFormula: `{email} = "${emailAddress}"`,
        maxRecords: 1,
        fields: ["hackathons", "hashed_token"]
    }).all()

    const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank
    if (!(verifySession(prettyRecordID[0]["fields"]["hashed_token"], accessTokenEncrypted))){
        throw "Unauthorized"
    }
    return prettyRecordID[0]["fields"]["hackathons"]

}
export async function GET(request: Request){
    const session = await auth();
    const encryptedToken = encryptSession(session!.access_token!, process.env.AUTH_SECRET!)
    try {
        const response = await getHackathonStatus(session!.user.email!, encryptedToken)
        return NextResponse.json({ message: response }, { status: 200 })

    } catch {
        return NextResponse.json({ error: "Something went catastrophically wrong." }, { status: 400 })
    }

}