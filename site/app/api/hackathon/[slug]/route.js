import { NextResponse } from "next/server";
import Airtable from 'airtable';

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID)


// Check whether the code is valid for an existing (i.e., currently running) hackathon
async function validateHackathon(hackathonCode){
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
async function linkUserToHackathon(emailAddress, hackathonCode, hackathonName){
        const recordID = await airtable("Registered Users").select({
            filterByFormula: `{Email} = "${emailAddress}"`,
            maxRecords: 1,
            fields: ['Record ID']
        }).all()

        const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank

        await airtable("Registered Users").update([
            {
                "id": prettyRecordID[0]["id"],
                "fields": {
                    "Hackathon Code": hackathonCode,
                    "Hackathon Name": hackathonName
                }
            }])
        return hackathonName
}


export async function POST(request, { params } ) {
    const slug = ((await params).slug)
    const code = await slug
    let emailAddress
    try {
    emailAddress = (await request.json())["email"]
        } catch {
        return NextResponse.json({ error: "Email address not supplied"}, { status: 422 })
    }
  
    const hackathon = await validateHackathon(code)
    if (hackathon){
      const response = await linkUserToHackathon(emailAddress, code, hackathon[0]["fields"]["Name"])
      return NextResponse.json({message: response}, {status: 200 });
    } else {
        return NextResponse.json({error: "Not a valid hackathon code. Double check you've typed it in correctly!"}, { status: 404 })
    }
}
