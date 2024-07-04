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
<a href="https://codesandbox.io/p/github/Daniel54088/apps-container/main?import=true&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cly6x7m5300063b6kj3wg3n0b%2522%252C%2522sizes%2522%253A%255B60%252C40%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cly6x7m5200023b6krv2ovnt1%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cly6x7m5200043b6ksx8i7153%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cly6x7m5200053b6klh5u0bgo%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cly6x7m5200023b6krv2ovnt1%2522%253A%257B%2522id%2522%253A%2522cly6x7m5200023b6krv2ovnt1%2522%252C%2522activeTabId%2522%253A%2522cly6xasur009n3b6k014uf17f%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cly6x7m5200013b6khtiphy1z%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fnode_modules%252Fnext%252Fdist%252Fserver%252Flib%252Frouter-utils%252Ffilesystem.js%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A151%252C%2522endLineNumber%2522%253A151%252C%2522startColumn%2522%253A19%252C%2522endColumn%2522%253A19%257D%255D%252C%2522id%2522%253A%2522cly6xasur009n3b6k014uf17f%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%257D%252C%2522cly6x7m5200053b6klh5u0bgo%2522%253A%257B%2522id%2522%253A%2522cly6x7m5200053b6klh5u0bgo%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522ENV_SETUP%2522%252C%2522id%2522%253A%2522cly6x7mi800093b6kf8owxxnt%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%252C%2522activeTabId%2522%253A%2522cly6x7mi800093b6kf8owxxnt%2522%257D%252C%2522cly6x7m5200043b6ksx8i7153%2522%253A%257B%2522id%2522%253A%2522cly6x7m5200043b6ksx8i7153%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cly6x7m5200033b6klg5lhkuu%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522cly6x7mxq002ydaeedd7ka8v8%2522%257D%255D%252C%2522activeTabId%2522%253A%2522cly6x7m5200033b6klg5lhkuu%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D">Codesand Box</a> <br>

Plesae run yarn dev in codesandbox terminal

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



