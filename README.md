 
# Shopify Backend Challenge 2022
Welcome to my Shopify Backend Challenge for 2022! For those who don't know what this challenge is and happened to stumble upon this repository, you can check it out [here](https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit#)

For this challenge, I created a back-end GraphQL API representing an inventory management system with basic CRUD capabilities. In addition to CRUD implementation, I had to pick one feature out of a list mentioned in the Google Docs. The feature I picked was **Push a button export product data to a CSV**. 
 
 **Demo Link:** https://omar-shopify-backend-challenge.netlify.app

## Tech Stack

### Back-end 
 - Node.JS w/ TypeScript
 - Express
 - Apollo
 - GraphQL
 - TypeORM w/ SQLite - SQLite was chosen for the purpose of being easy to run locally without much effort in setting up. 

While front-end was not focused on for this challenge, here is the stack below for anyone that's curious :)
### Front-end
- [Next.JS](https://nextjs.org/)
- [urql - GraphQL Client](https://formidable.com/open-source/urql/) 
- [Chakra UI](https://chakra-ui.com/)
- [Formik](https://formik.org/)

## Setting up / Installation

In order to run this project locally, you'll need to install the LTS version of Node.JS, it can be downloaded here: [https://nodejs.org/en/](https://nodejs.org/en/). If you have Node already, anything above v16 should be fine.

Please make sure you clone the repository if you haven't already :)

Starting with the back-end, open up a terminal/command prompt and navigate to the directory where you cloned the repository. Navigate to the backend folder:

    cd backend

Once you're in the backend folder, you need to install all the dependencies

    npm install
After all the dependencies have installed, you will be able to start the backend using the following command:

    npm run dev

And voila....! You should be seeing a series of SQL statements and a final message that says

    Server started on http://localhost:4000/graphql

The backend is now successfully running!

Now that we have the beast behind the inventory management system, we need a way to actually use it! This means we need to run our frontend locally now.

Open up another terminal/command prompt. **Please please make sure you leave the backend on the terminal/command prompt earlier as the frontend needs to connect to it to function. If you happened to close it, please follow the above instructions again to start it up :)**

Navigate to the frontend folder this time from the root directory of the cloned repository folder:

    cd frontend

Install all the dependencies, this one might take a while!

    npm install

Now that all the dependencies are installed, you should be able to start the frontend using the command:

    npm run dev

Voila! The frontend should be up and running, you will see a message like this:

    ready - started server on 0.0.0.0:3000, url: http://localhost:3000

If the port is **not** 3000, that means you have something else running on port 3000 which is completely fine, you can navigate to the link provided in the console. In this case, the link is http://localhost:3000

You should be able to see the inventory page. Below is a gallery / description of the frontend application so you're aware of its capabilities!

## Gallery
This is the inventory / home page. You're able to view all inventory items, you can edit or delete items using the icons. The Edit icon will send you to a page where you can edit an item, and the Delete icon deletes the item.
![Inventory Page](https://i.imgur.com/13TniAZ.png)
### Create Inventory Item Page
This is the page where you're able to create a new item, all the fields are required. After filling the fields out, you can press the Create button which will take you back to the Home page where you can see your new item.
![Create Inventory Item Page](https://i.imgur.com/3fPQT8Q.png)
### Edit Item Page
This is the page responsible for editing an item, you're able to edit only the Name, Description and Quantity fields. All of these fields are required. If you choose to modify the fields, you can press the Save button which leads you back to the Home page where you can see your updated data.
![Edit Item Page](https://i.imgur.com/vKEFbp6.png)
### Export Inventory Data Page (Special Feature)
This is the page responsible for exporting all ***inventory data*** to a CSV sheet. You can select any of the fields you want. If you choose not to select any fields, all fields will be exported by default. After pressing the Export button, you will be prompted to download/open the CSV sheet and will be sent back to the home page.![Export Inventory Data Page](https://i.imgur.com/tnHwvzu.png)
Want to see it in action? Below is a GIF :)
![Exporting in action!](https://i.imgur.com/SC586zI.gif)
