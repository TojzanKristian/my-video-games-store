# my-video-games-store

## Short description of the video game store operation
The homepage is accessible to everyone, and it displays the video games.<br/>
Every video game has a link option that leads to the details page.<br/>
To use the other features, the user must register and log in to the system.<br/>
After logging in, the profile page and cart page become available to the user.<br/>
On the profile page, the user can see their own data,<br/>
as well as options to modify the data and review purchased video games.<br/>
If the user clicks on the option to modify their data, a new page opens where they can edit their data.<br/>
If the user wants to review the purchased video games, they will see a table displaying the video games.<br/>
If the user adds a video game to the cart, they can view the cart's contents by clicking on the cart icon.<br/>
On the cart page, the user can see the contents of the cart, the total price and the PayPal payment option.<br/>
The user can also remove the video game from the cart if they decide not to purchase it after all.<br/>
If they successfully paid for the video games, they will receive the Steam activation keys via email.<br/>
The system also includes an admin section for administrators.<br/>
The administrator has the following options:
* Overview of all users in the system.
* Overview of all games in the system.
* Overview of all purchases in the system.
* And adding new video games to the system.

## Pages short description
**Home page** - the homepage of the application where the available video games are displayed.<br/>
**Video game details page** - the page where all the details of the video game can be viewed.<br/>
**Login page** - the page where the user can sign in with their email and password.<br/>
**Registration page** - the page where the user can register into the application.<br/>
**User profile page** - the page where the user data is displayed.<br/>
**My games** - the page where purchased games are visible.<br/>
**Edit profile page** - the page where the user can modify their data.<br/>
**Cart page** - this page displays the video games in the cart and the payment option.<br/>
**All users page** - the page where the administrator can see all users in the system.<br/>
**All games page** - the page where the administrator can see all video games in the system.<br/>
**All purchases page** - the page where the administrator can see all purchases in the system.<br/>
**Add new video game page** - the page where the administrator can add new video games to the system.

## Illustration of the pages through images
* **Home page**:
![Home](https://github.com/user-attachments/assets/5141f4bb-8561-4df8-b63b-3fb7a971a6c6)
* **Video game details page**:
![VideoGamesDetails](https://github.com/user-attachments/assets/9b24836d-678f-434e-9c91-0e99f625ea60)
* **Login page**:
![Login](https://github.com/user-attachments/assets/03ebce7c-ef88-45be-8adf-c761e0996def)
* **Registration page**:
![Registration](https://github.com/user-attachments/assets/36a45a72-f3ad-4776-8f24-b7e4a6a21d21)
* **User profile page**:
![Profile](https://github.com/user-attachments/assets/d0b83bf7-066f-4d4b-8aba-ca453739d6aa)
* **My games**:
![MyGames](https://github.com/user-attachments/assets/783120e9-0d34-4f08-8406-57a66e33a214)
* **Edit profile page**:
![EditProfile](https://github.com/user-attachments/assets/d3a39284-8a53-47bd-879c-6f9dbd42e3e5)
* **Cart page**:
![Cart](https://github.com/user-attachments/assets/b23c8ac4-5612-4ba8-a120-44edf8206c3c)
* **All users page**:
![AllUsers](https://github.com/user-attachments/assets/021f9d99-2d6b-4297-bcff-6a43f8358f90)
* **All games page**:
![AllGames](https://github.com/user-attachments/assets/fdbeac2c-839d-4c62-a7aa-053bfc6dcbbd)
* **All purchases page**:
![AllPurchases](https://github.com/user-attachments/assets/2df54ec2-9850-4cee-9f95-f0ff519d71d5)
* **Add new video game page**:
![AddNewGame](https://github.com/user-attachments/assets/ab66a46c-2208-4e95-9c5f-b92adee57999)

## Used technologies
1. _React with TypeScript_ - The frontend part of the application
2. _ASP.NET Core Web API_ - The backend part of the application
3. _Microsoft SQL Server_ - The part of the application responsible for the database
4. _SQL Server Management Studio (SSMS)_ - Used for displaying and modifying data in database

## Deployment overview of the application on AWS
1. The _frontend_ part of the application was deployed to **AWS Amplify**
2. The _backend_ part of the application was deployed to **EC2 (Elastic Compute Cloud)**
3. The database, which is _SQL Server_, was deployed to **RDS (Relational Database Service)**
4. The images are stored in an **S3 (Simple Storage Service) bucket**

## Installation
### The steps to create the application in the _frontend_ folder are as follows:
The first step is to download and install _Visual Studio Code_.<br/>
It can be found at the following link: https://code.visualstudio.com/Download<br/>
If you need assistance watch the video: https://www.youtube.com/watch?v=cu_ykIfBprI<br/>
The second step is to download and install _Node.js_.<br/>
It can be found at the following link: https://nodejs.org/en/download/<br/>
If you need assistance, watch the video - https://www.youtube.com/watch?v=eft-LJb4kW0<br/>
The third step is to create a _React_ application with _TypeScript_.<br/>
To create this, you can use the following command:
```
npx create-react-app my-app --template typescript
```
If you need assistance, watch the video - https://www.youtube.com/watch?v=MWpmPP4z8HE

### The steps to create the application in the _backend_ folder are as follows:
The first step is to download and install _Visual Studio 2022_.<br/>
It can be found at the following link: https://visualstudio.microsoft.com/downloads/<br/>
If you need assistance, watch the video: https://www.youtube.com/watch?v=-B7GObvvems<br/>
The second step is to create an _ASP.NET Core Web API_ project.<br/>
If you need assistance, watch the video: https://www.youtube.com/watch?v=s1bk-68aB1U

### The following steps are necessary for the database setup:
The first step is to download and install _Microsoft SQL Server_.<br/>
It can be found at the following link: https://www.microsoft.com/en-us/sql-server/sql-server-downloads<br/>
The second step is to download and install _SQL Server Management Studio (SSMS)_.<br/>
It can be found at the following link: https://shorturl.at/OZUU8<br/>
If you need assistance, watch the video: https://www.youtube.com/watch?v=iaUXjTL_F9U<br/>

### The steps to configure AWS deployment for the application
The first step is to create an AWS account here: https://signin.aws.amazon.com/signup?request_type=register<br/>
The second step is to log in to your AWS account.<br/>
The third step is to add the **AWS Toolkit** to _Visual Studio_.<br/>
If you need assistance, watch the video: https://www.youtube.com/watch?v=uvJEpvDkuNc