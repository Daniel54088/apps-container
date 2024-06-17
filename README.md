<p align="center"> 
  <img src="/public/icons8-logo-33.svg" alt="Ticket Pilot Logo" width="80px" height="80px">
</p>
<h1 align="center">Ticket Pilot</h1>
<h3 align="center"> Manage your work tasks with ease. </h3>  


</br>

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#introduction"> ➤ Introduction</a></li>
    <li><a href="#tech-stack"> ➤ Tech stack</a></li>
    <li><a href="#app-structure"> ➤ App structure</a></li>
    <li><a href="#deployment"> ➤ Deployment</a></li>
  </ol>
</details>

![---------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="introduction"> :pencil: Introduction</h2>

<p align="justify"> 
This project leverages the latest front-end technologies, Next.js 14 and the app router, to create a task management dashboard. Users can create, modify, and delete tickets, as well as search for tickets and assign various labels to facilitate organization. The primary goal of this app is to demonstrate my proficiency in building a deployable, functional dashboard using the newest features of Next.js 14 and TypeScript. This project serves as an assignment for a technical interview, showcasing my capability to utilize cutting-edge technology in a practical application.
</p>

<p align="center">
  <img src="/public/dashboard.png" alt="Table1: 18 Activities" width="70%" height="70%">        
</p>

### Demo url:

https://main.d1m1fg2oyohdto.amplifyapp.com/ticketpilot/dashboard

![---------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<!-- Tech stack -->
<h2 id="tech-stack"> :books: Tech stack</h2>

<!--This project is written in Python programming language. <br>-->
The following open source techs are used in this project:
* <b>Base</b> <br>

  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  
* <b>Code Consistency & Reliability</b> <br>

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)   ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
  ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
  
* <b>State management</b> <br>

  ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)

* <b>Testing tool</b> <br>

   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

* <b>Others</b> <br>

   ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)  ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![---------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- App structure -->
<h2 id="app-structure"> :fork_and_knife: App structure </h2>

1. Get initial data from Postgre sql in sever render component(Usually in layout.tsx)
2. Hydrate initial data to state management store. (Easy for client component to use)
3. Render client side component by store states. (Like selector in redux)
4. User do some actions(create, update, delete..etc), triggering server actions. (Replace RESTFUL API in next 14!)
5. Update state store and mutate data in database.

<p align="center">
  <img src="/public/app-structure.png" alt="app structure" width="70%" height="70%">        
</p>

![---------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<!-- deployment -->
<h2 id="deployment"> :floppy_disk: Deployment</h2>  

### Testing code (Jest)
- Component UI testing, making sure the element render successfully. 
- Test ticket searching feature works as expected.
- Select ticket should render correctlly.
// Todo: Adding more unit testing

### CI / CD  (Aws amplify)

When merge the latest code to github main branch, It will automatically integration the code and deploy on the AWS server by amplify.yml 

<p align="center">
  <img src="/public/CICD.png" alt="cicd" width="100%" height="100%">        
</p>


<p align="center">
  <img src="/public/deployment.png" alt="deployment" width="100%" height="100%">        
</p>



![---------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)



