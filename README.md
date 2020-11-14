# Shiver-Me-Tinder

Matthew DaDamio and Jack Fox

A dating website by pirates for pirates.

## How to deploy Shiver-Me-Tinder locally:

Once you have the source code downloaded and unzipped, install Node.js and serve your app with the Angular CLI.

From the terminal, install the Angular CLI globally with:

`npm install -g @angular/cli`

Then run `npm install` to install the necessary NPM packages

Lastly, run `ng serve` to run the project locally

For more help reference: https://angular.io/guide/setup-local

## Connecting a Database

Our app is configured to use Parse through a Back4App database.

1. Edit `environment.ts` to include your Parse API keys and Back4App URL.

2. Create the relevant classes in your Back4App database

```
_User (this is a default class)
  objectID <String>
  username <String>
  password <String> (hidden)
  profile_pointer <Pointer profile>

chat
  objectID <String>
  userA <Pointer _User>
  userB <Pointer _User>
  activeChat <String> (default = wait)

message
  objectID <String>
  updatedAt <Date>
  chat <Pointer chat>
  sender <String>
  content <String>

profile
  objectID <String>
  name <String>
  rank <String>
  profileImage <String>
  username <String>
  description <String>
  user_id <Pointer _User>
```