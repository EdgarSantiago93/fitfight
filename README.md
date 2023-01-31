
# Fitfight
My group of friends started working out, to make it more interesting, we decided to put in place rules and a point system that ultimately decided who would be the winner.

- Every member must log at least 30 mins of active exercise
- Theres an entry fee
- They must prove their participation by uploading:
    - A photo of themselves with the day's unique pose, if no entry has been submitted yet, they get to choose one.
    - (optional) A photo of their fitness tracker
    - (optional) Log their active minutes and active calories
- This system is somewhat based on the ```proof of work``` premise, every node(member) must prove that certain amount of effort has been expended. Verifiers can subsequently confirm this with little effort by voting (👍 or 👎) on each others entries.
- Each member decides if the entry in question is valid or not
- Every day at 00:05 a cron job is ran to count the votes for and against for each entry and validates them accordingly
- A point is awarded to a ```validated``` entry
- At the end of each month, whomever has accrued more points is declared the winner
- Theres a jackpot plus a difference-of-points reward system 
    eg.
    - John places 1st with 10 points -> gets the jackpot
    - Andrew places 4th with 6 points -> pays John ```(10-6) * $10 = $40```

## Technical
This project was created as an experiment / something fun for my friends/ a great way of learning a new framework

It is built using the  ```AdonisJs``` framework with ```React```  and ```Mantine.ui``` for the frontend, with  ```Typescript``` and ```NodeJs``` for backend and ```SQL``` for database.

It makes use of several third party APIS like:
-  Aws
- Telegram
- Private server running a custom python app to transform images

It is hosted on ```Digital Oceans``` cloud with ```Laravel Forge``` as supervisor and manager and its live as of Jan 30th 2023
## Screenshots

![App Screenshot](/sc1.png)
![App Screenshot](/sc2.png)
![App Screenshot](/sc3.png)
![App Screenshot](/sc4.png)
![App Screenshot](/sc5.png)


## Run Locally

This project contains the already built codebase

Clone the project

```bash
  git clone https://github.com/EdgarSantiago93/fitfight.git
```

Go to the project directory

```bash
  cd fitfight
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node ace serve --watch
```
or 
```bash
  cd project/build && node server.js
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_REGION`

`TELEGRAM_BOT_ID`

`TELEGRAM_GROUP_ID`
