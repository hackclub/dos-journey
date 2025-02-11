# Contribute to Days of Service Journey
Contributions are welcome to this repository!
Step one is to join the `#dos-journey` channel on Slack. This can help you stay posted on major changes and also have you contribute to the project in collaboration with other people!

Here's a couple of general things about the project that can help you get up and running quickly:
## Site Contributions
* The `DEVELOPMENT_SETTINGS.ts` file can help to optimize your work. When using Developer Tools in your browser, toggling some of these settings can ease lag.
### Markdown (MDX) and Video Contributions
* The site uses a similar system to Next.js's App Router to determine routes. Here's an example tree:
```
panel-content
├── discovery
│   ├── getting-started
│   │   └── index.mdx (/adventure/discovery/getting-started)
│   ├── join-the-slack
│   │   └── index.mdx
│   └── resources
│       └── index.mdx
├── code
│   ├── write-your-first-line
│   │   └── index.mdx (/adventure/code/write-your-first-line)
│   └── first-pull-request
│       └── index.mdx
└── hack-club-community
    ├── scrapbooking
    │   └── index.mdx (/adventure/hack-club-community/scrapbooking)
    └── start-a-club
        └── index.mdx
```

The folder name indicates the route (/adventure is added by default) and index.mdx marks the end of the route. Some example routes post-build are shown in the tree above.

You can also create interactive components in the `components/panels/add-ons` directory. Import them on your MDX file the way you would any other React component and use however you'd like!

## Slack Contributions

In order to test Slack OAuth, you will need a public-facing `https` URL to enter as the redirect URL. You can use any of the following two methods to obtain one for development, or another that works for you. 

### 1. ngrok

1. Create an [ngrok account](https://download.ngrok.com/) and follow the instructions to install it on your device. 
2. Complete the onboarding stage and deploy your app on a static domain. The command you run should look something like this:
    ```ngrok http --url=<your ngrok static provided domain> 3000```
3. Add your ngrok URL into your .env file as appropriate. You can now access your app from that domain, as well as `localhost`.

### 2. zrok

Zrok has more lenient traffic restrictions than ngrok.

1. Create a [zrok account](https://docs.zrok.io/docs/getting-started/) on the public zrok instance.
2. Download and install [zrok](https://docs.zrok.io/docs/getting-started/#installing-the-zrok-command) for your device.
3. Create a reserved share for this project by running the following:
    ```
    zrok reserve public 3000 --unique-name "insert a name of your choice"
    ```
4. Add your zrok URL into your .env file as appropriate. You can now access your app from that domain, as well as `localhost`.

### Creating the Slack app
1. Create a [new Slack app](https://api.slack.com/apps).
2. Copy the provided Client ID and Client Secret, then enter them into your .env file as appropriate.
3. Navigate to `OAuth & Permissions`. Add your ngrok/zrok/other URL as the Redirect URL, then add the `identify` user token scope, as well the as `users:read` and `users:read.email` scopes.
4. Finally, install the app to the Slack.

When testing Slack OAuth, make sure you have both the local dev environment and the ngrok/zrok/other instance running.

## Airtable Contributions

Obtain the Airtable API key and base ID and enter them into your .env file as appropriate (If you're involved in this project, DM @phthallo on the Hack Club Slack for help with this)