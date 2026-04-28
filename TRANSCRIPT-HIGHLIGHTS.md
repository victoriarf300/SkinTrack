# Transcript Highlights

## 1. Planning the application structure

At the beginning of this development, I used GitHub Copilot Chat in VS Code to help plan the structure of my SkinTrack application. I asked how to design a skincare routine tracker that stores user routines in localStorage. Copilot gave me neat suggestions and I ran with them

## 2. Designing the data model

Before writing the CRUD functionality, I asked Copilot what data structure would work best for storing skincare steps. Copilot recommended storing the routines as an array of objects in localStorage. This structure made it easier to implement features like editing, deleting, and toggling completion status.

## 3. Implementing CRUD functionality

I used Copilot to help generate the initial JavaScript functions for adding, deleting, and toggling skincare routine steps. After reviewing the generated code, I modified it slightly so it worked with my HTML layout and ensured the routines were displayed correctly in the morning and night sections.

## 4. Debugging localStorage persistence

During testing, I noticed that my skincare steps disappeared after refreshing the page. I asked Copilot why this was happening, and it suggested loading the stored data from localStorage when the page first loads. Implementing this fix allowed the routine data to persist after refreshing the browser.

## 5. Iterating on the user interface

After getting the core features working, I worked with Copilot to improve the layout of the application. We separated the routines into morning and night sections and adjusted the styling to create a cleaner and more responsive interface for the users!

## 6. Evaluating AI suggestions

At one point Copilot suggested a more complex approach for managing application state. Since my project was small, I decided to keep the implementation simple using vanilla JavaScript and localStorage. This decision helped keep the code easier to understand and maintain instead of causing random crashes.
