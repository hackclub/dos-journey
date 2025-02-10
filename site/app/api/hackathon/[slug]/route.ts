import { NextResponse } from "next/server";
import Airtable from 'airtable';
import { auth } from '@/auth';
import { encryptSession, verifySession } from '@/utils/hash';

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!)

// Check whether the code is valid for an existing (i.e., currently running) hackathon
async function validateHackathon(hackathonCode: string){
        const validity = await airtable("Hackathons").select({
            filterByFormula: `AND({Code} = "${hackathonCode}", {Active?})`,
            maxRecords: 1,
            fields: ['Name']
        }).all()
    
        if (!validity.length){
            return false
        }
        return JSON.parse(JSON.stringify(validity))
}

// Update hackathon attendance in the user's profile (MAKE SURE TO VALIDATE HACKATHON FIRST)
async function linkUserToHackathon(emailAddress: string, hackathonCode: string, hackathonName: string, accessTokenEncrypted: string){
        const recordID = await airtable("Registered Users").select({
            filterByFormula: `{Email} = "${emailAddress}"`,
            maxRecords: 2,
            fields: ["Record ID", "Hashed Token"]
        }).all()

        const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank
        if (!(verifySession(prettyRecordID[0]["fields"]["Hashed Token"], accessTokenEncrypted))){
            throw "Unauthorized"
        }

        await airtable("Registered Users").update([ // TO DO: upsert 
            {
                "id": prettyRecordID[0]["id"],
                "fields": {
                    "Hackathon Codes": hackathonCode,
                    "Hackathons": hackathonName
                }
            }])
        return hackathonName
}


export async function POST(request: Request, { params }: { params: Promise<{slug: string}>} ) {
    const session = await auth();
    const slug = ((await params).slug)
    const code = await slug
    const encryptedToken = encryptSession(session!.access_token!, process.env.AUTH_SECRET!)
    const hackathon = await validateHackathon(code)
    if (hackathon){
      const response = await linkUserToHackathon(session!.user.email!, code, hackathon[0]["fields"]["Name"], encryptedToken)
      return NextResponse.json({message: response}, {status: 200 });
    } else {
        return NextResponse.json({error: "Not a valid hackathon code. Double check you've typed it in correctly!"}, { status: 404 })
    }
}


