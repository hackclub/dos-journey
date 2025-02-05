import Airtable from 'airtable';
import { NextResponse } from "next/server";

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID)

// Update all info known about the registered user, including their Slack ID if they're in the Slack
async function linkUser(emailAddress, access_token){
    const response = await fetch(`https://slack.com/api/users.lookupByEmail?email=${emailAddress}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + access_token}
        }
    ).then(res => res.json())
    const id = response["user"]["id"]
    const r = await airtable("Registered Users").select({filterByFormula: `{Email} = "${emailAddress}"`}).all()
    console.log("AAAA", r, "AAAA")
    if (r.length) {
        console.log("User exists in DB")
        return ("User exists in DB")
    } else { // user is logging on for the first time
        console.log("adding user to database")
        const l = await airtable("Registered Users").create(
            [{
                fields: {
            "Email": emailAddress,
            "Slack ID": id
                }
        }])
    return "User added to DB"
    }
}

export async function POST(request) {
    const emailAddress = (await request.json())["email"]
    const access_token  = await request.headers.get("Authorization").split(" ")[1]
    try {
        const r = await linkUser(emailAddress, access_token)
        return NextResponse.json({message: "Success"}, {info: r}, {status: "200"})
    } catch {
        return NextResponse.json({error: "Something went wrong."}, {status: "400"})

    }
}
