# countries_explorer
This repository contains my efforts towards a job application coding task

Architecture and Design

Challenges Faced
As I face challenges throughout the development process, I will include them here.

The first challenge I faced was that I had never used TypeScript for any application before. I had seen some basic examples of it, and had a basic understanding of what it is used for, but I had never used it.

Once I completed the basic implementation, I ran into some issues with some of the required fields.  For example, the countries API did not seem to have a region field, population field, and timezone field.  To get around the region issue, I used the continent field. Using the continent field made some challenges, as I was able to retrieve the continent name, and then when I tried to filter by continent, no countries were being displayed, which I assumed was due to a type mismatch, as the continent comes as an object from the GraphQL query.  Using console logging, I found that the types were matching, so there must be another issue.