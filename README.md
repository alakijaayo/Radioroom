# Radioroom

A music media application that allows users to share, sync, discuss and listen to music in a collaborative space.

## Build Status

[![Build Status](https://travis-ci.org/alakijaayo/Radioroom.svg?branch=master)](https://travis-ci.org/alakijaayo/Radioroom)


## Description

  * Radioroom is a music media application and website that allows users to listen, share, sync and discuss music in a collaborative space. With this application, we aim to allow users to all join a room together and enjoy a space where they can listen to music at the same time regardless of where they are, and also be able to share new music with new users and discuss music within the group. Other features we aim to provide are:

  * Once signed in using their spotify details, a user is directed to a chat room where music hosted using a Spotify Web API, is played in synchronicity with other signed in users. 
   
  * The room hosts a playlist in which users can add a song they searched using the built in search bar. This search bar utilizes the API to search through Spotify's music library giving the user access to a relatively extensive choice of songs to pick from. 
   
   Users can also see the number of others active on the app. 

## Technologies Used

### Front End
- React
- Jest
- Enzyme
- Cypress

### Back End
- Node
- Spotify Web API

## How to install

- React

 - Use ``create-react-app`` to save time on configuring and setup.
  
             $ npm install -g create-react-app
  
             $ create-react-app radioroom
  
             $ cd /radioroom
  
 - Jest 
 
   - Included in the create-react-app package
   
 - Enzyme
 
   - Update dependencies installed due to create-react-app
   
             $ npm install ajv 
   
   - Install Enzyme
   
             $ npm install Enzyme
   
   - Install Enzyme adapter (this will tell Enzyme what type of code to expect, in this case react 16)
   
             $ npm install --save-dev jest-enzyme enzyme-adapter-react-16 
   
 - Cypress
 
             $ npm install cypress --save-dev 
   

### Application Deployer
- Heroku

## Development

For more information on our development process with regards to our Minimum Viable Product and User Stories, please read our [MVP.md](MVP.md)
