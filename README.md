# Days of Service Journey
A Hack Club project gamifying the experience of learning to code through the [Days of Service Initiative](https://daysofservice.hackclub.com).


## Development

1. Clone the repository

    ```
    git clone https://github.com/hackclub/dos-journey && cd dos-journey
    ```

2. Install dependencies

    ```
    npm install
    ```

3. Copy the .env file and fill it out as required

    ```
    cp .env.example .env
    ```

3. Start the development server and navigate to `localhost:3000` in your browser.

    ```
    npm run dev
    ```

4. To start testing auth, follow the steps under the following headings.

### Setting up ngrok

*You will need this for the next step*

1. Create an [ngrok account](https://download.ngrok.com/) and follow the instructions to install it on your device. 
2. Complete the onboarding stage and deploy your app on a static domain. The command you run should look something like this:
    ```ngrok http --url=<your ngrok static provided domain> 3000```
3. Add your ngrok URL into your .env file as appropriate. You can now access your app from that domain, as well as `localhost`.


### Setting up integration with Slack

1. Create a [new Slack app](https://api.slack.com/apps).
2. Copy the provided Client ID and Client Secret, then enter them into your .env file as appropriate.
3. Navigate to `OAuth & Permissions`. Add your ngrok URL as the Redirect URL, then add the `identify` user token scope. 
4. Finally, install the app to the Slack.