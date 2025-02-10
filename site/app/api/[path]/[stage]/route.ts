import { NextResponse } from "next/server";
import Airtable from 'airtable';
import { encryptSession, verifySession } from '@/utils/hash';

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)


async function updateStage(emailAddress: string, currentStage: string, accessTokenEncrypted: string){
    const recordID = await airtable("Registered Users").select({
        filterByFormula: `{Email} = "${emailAddress}"`,
        maxRecords: 1,
        fields: ['Record ID']
    }).all()

    const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank


    if (!(verifySession(prettyRecordID[0]["fields"]["Hashed Token"], accessTokenEncrypted))){
        console.log(prettyRecordID)
        throw "Unauthorized"
    }
    await airtable("Registered Users").update([
        {
            "id": prettyRecordID[0]["id"],
            "fields": {
                "Current Stage": currentStage
            }
        }])
    return 
}

export async function POST(request: Request, { params }: { params: Promise<{slug: string}>} ) {
    return 
}