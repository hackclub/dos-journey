// TO DO: RESTRUCTURE THIS ENTIRE JANK API SYSTEM :skulk:
// move get for hackathon and achievements to be a general fetch for user/route.ts, and post to be user/[hackathon], user/[achievements]
import { NextResponse } from "next/server";
import Airtable from 'airtable';
import { auth } from '@/auth';
import { encryptSession, verifySession } from '@/utils/hash';

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)

// Get a list of achievements the user is noted as having completed
async function getAchievementStatus(emailAddress: string, accessTokenEncrypted: string){
    const recordID = await airtable("Registered Users").select({
        filterByFormula: `{email} = "${emailAddress}"`,
        maxRecords: 2,
        fields: ["achievements", "hashed_token"]
    }).all()

    const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank
    if (!(verifySession(prettyRecordID[0]["fields"]["hashed_token"], accessTokenEncrypted))){
        throw "Unauthorized"
    }
    return prettyRecordID[0]["fields"]["achievements"]

}
export async function GET(request: Request){
    const session = await auth();
    const encryptedToken = encryptSession(session!.access_token!, process.env.AUTH_SECRET!)
    try {
        const response = await getAchievementStatus(session!.user.email!, encryptedToken)
        return NextResponse.json({ message: response }, { status: 200 })

    } catch {
        return NextResponse.json({ error: "Something went catastrophically wrong." }, { status: 400 })
    }

}