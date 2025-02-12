import Airtable from 'airtable';
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { encryptSession, verifySession } from '@/utils/hash'

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!)

// Update all info known about the registered user, including their Slack ID if they're in the Slack
async function linkUser(emailAddress: string, accessToken: string){
    const accessTokenJoined = encryptSession(accessToken, process.env.AUTH_SECRET!)
    const response = await fetch(`https://slack.com/api/users.lookupByEmail?email=${emailAddress}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken}
        }
    ).then(res => res.json())
    const id = response["user"]["id"]
    const r = await airtable("Registered Users").select({filterByFormula: `{email} = "${emailAddress}"`}).all()
    if (r.length) { // user exists in DB
        return ("User exists in DB")
    } else { // user is logging on for the first time
        console.log("adding user to database")
        const l = await airtable("Registered Users").create(
            [{
                fields: {
            "email": emailAddress,
            "slack_id": id,
            "hashed_token": accessTokenJoined
                        }
        }])
    return "User added to DB"
    }
}

async function getUser(emailAddress: string, accessTokenEncrypted: string){
    const recordID = await airtable("Registered Users").select({
        filterByFormula: `{email} = "${emailAddress}"`,
        maxRecords: 1,
        fields: ["hashed_token", "current_stage"]
    }).all()
    const prettyRecordID = JSON.parse(JSON.stringify(recordID)) // jank
    if (!(verifySession(prettyRecordID[0]["fields"]["hashed_token"], accessTokenEncrypted))){
        throw "Unauthorized"
    }
    return prettyRecordID[0]["fields"]["current_stage"]
}

export async function POST(request: Request) {
    const session = await auth();
    const emailAddress = session!.user.email!
    try {
        const r = await linkUser(emailAddress, session!.access_token!)
        return NextResponse.json({message: "Success"}, {status: 200})
    } catch {
        return NextResponse.json({error: "Something went wrong."}, {status: 400})

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
