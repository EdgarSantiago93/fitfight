
# Fitfight

My group of friends and I have started a fun workout challenge with rules and a point system to determine the winner. To participate, every member must log at least 30 minutes of active exercise and pay an entry fee. They must prove their participation by submitting a photo of themselves with the day's unique pose (or choose one if no other entry has been submitted yet), and they may also include a photo of their fitness tracker and log their active minutes and calories.

This system operates on the ```proof of work``` principle where every member must demonstrate a certain amount of effort. Verifiers can easily validate the entries by voting "👍" or "👎" on each other's submissions. The members will decide if each entry is valid or not. Every day, a cron job runs at 00:05 to tally the votes and validate the entries, awarding a point to each ```validated``` entry.

At the end of each month, the member with the most points will be declared the winner and receive the jackpot. There's also a difference-of-points reward system in place, for example, if John places first with 10 points, he gets the jackpot, and if Andrew places fourth with 6 points, he pays John $40 ```(calculated as (10-6) * $10)```.

In case of a tie in points, the system will determine the winner by considering the member with the most number of votes. If there's still a tie, the average time of the entries will be taken into account and the member with the earliest time will be declared the winner.

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
