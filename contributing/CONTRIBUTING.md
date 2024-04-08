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
* these details will come soon once we iron out those details.