<p align="center">
  <a href="https://cocktails-collections-sml.herokuapp.com/#/">
    <img src="./iconForReadme.svg" alt="CocktailsLogo" width="48" height="48">
  </a>
</p>

<h3 align="center"> Cocktails Collections </h3>
<h3 align="center"> 雞尾酒酒譜</h3>
<a href="https://cocktails-collections-sml.herokuapp.com/#/">
  <p align="center">Click here to the demo site</p>
</a>

## Table of Contents
- [About this project](#about-this-project)
- [How to use](#how-to-use)
- [Run the local server](#run-the-local-server)
- [Run the frontend server](#run-the-frontend-server)

## About this project 
<p>An web application based on <a href="https://www.thecocktaildb.com/"> The Cocktail DB</a>. Users can do the following actions.</p>
<p>使用 <a href="https://www.thecocktaildb.com/"> The Cocktail DB</a> 資料庫的雞尾酒資料為基礎，打造一個可以讓使用者以手機和電腦進行以下功能的應用程式</p>

1. 基本功能 (Basic Functions)
  - [x] 使用者用「名稱」關鍵字搜尋酒譜 ( Search cocktails by name)
  - [x] 使用者用「材料」關鍵字搜尋酒譜 ( Search cocktails by ingredients)
  - [x] 當使用者不曉得今天要喝什麼時，可以點選「隨機來一杯」按鈕獲取靈感 ( Click for a random drink)
2. 進階功能 (Advanced Functions)
  - [x] 使用者可以註冊 ( Register )
  - [x] 使用者可以登入 ( Log-in )
  - [ ] 使用者可以收藏酒譜 ( My Favorite Recipes )
3. 額外功能 (Extra Functions)
  - [ ] 使用者可以贊助表達支持 ( Donate Function )
  
## How to use
**Website 網站**
<p> Users can browse and search the cocktail recipes. If they registered and logged in, they can save their favorite recipes and donate to this project if they would like to.</p>
<p>使用者可以瀏覽、查詢雞尾酒譜。如果註冊會員並登入的話，可以收藏酒譜和進行自由贊助。</p>
<!-- <p align="center">
    <img src="./client/public/static/demo.gif" alt="Website Demo">
</p> -->

## Source Kits used in this project
**Front End**
- [vue](https://vuejs.org/) - The Progressive JavaScript Framework.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [sweetalert2](https://sweetalert2.github.io/) - A beautiful, responsive, customizable popup boxes
- [Element UI](https://element.eleme.io/#/en-US) - Element, a Vue 2.0 based component library for developers, designers and product managers

<!-- **Back End**
- [cors](https://www.npmjs.com/package/cors) - To activate Cross-Origin Resource Sharing
- [faker](https://www.npmjs.com/package/faker) - To generate the seed data for testing -->

<!-- ## Run the local server
### Prerequisites
- [npm](https://www.npmjs.com/get-npm)
- [Node.js](https://nodejs.org/en/download/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/andy922200/Cocktails-Collections.git
```
### Setup Database
**Create database via MySQL Workbench Panel**

```
> Run the following code
drop database if chatroom;
create database chatroom;
```

### Setup the Project on your device
**1. Enter the project folder**
```
$ cd chatroom
```
**2. Install packages via npm**

```
$ npm install
```
**3. Edit password in config.json file**
```
> /server/config/config.json
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "chatroom",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```
**4. Run migration**
```
> run the following code in the console  @ "/server"
$ cd /server
$ npx sequelize db:migrate
```
**5. Add Seeder**
```
> run the following code in the console  @ "/server"
$ npx sequelize db:seed:all
```
**6. Activate the server**
```
$ npm run dev
```
**7. Find the message on your console**
```
If you see the following message, the backend server is running.
> App is listening on port 3000!
```  -->

## Run the frontend server
**1. Enter the project folder**
```
> Open a new terminal window and enter the client folder
$ cd Cocktails-Collections/client
```
**2. Install packages via npm**
```
$ npm install
```
**3. Compiles the webpack for development**
```
$ npm run serve
```
**4. Format the coding style( If necessary )**
```
$ npm run lint
```

## Author
- [Andy Lien](https://github.com/andy922200)
- [The site icon is made by Freepik published on www.flaticon.com](https://www.flaticon.com/)