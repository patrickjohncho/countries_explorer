# countries_explorer
This repository contains my efforts towards a coding task

Architecture and Design

Challenges Faced
As I face challenges throughout the development process, I will include them here.

The first challenge I faced was that I had never used TypeScript for any application before. I had seen some basic examples of it, and had a basic understanding of what it is used for, but I had never used it.  I referred to documentation and used ChatGPT for basic examples and basic features.

Once I completed the basic implementation, I ran into some issues with some of the required fields.  For example, the countries API did not seem to have a region field, population field, and timezone field.  To get around the region issue, I used the continent field. Using the continent field made some challenges, as I was able to retrieve the continent name, and then when I tried to filter by continent, no countries were being displayed.  I assumed was due to a type mismatch, as the continent comes as an object from the GraphQL query.  Using console logging, I found that the types were matching, so there must be another issue.  I resolved the error as I was treating the object as an array in some cases, when I had already converted it to a string.

The next issue I attempted to resolve was the previously mentioned issue regarding the Population, Borders, and Timezone fields.  The GraphQL Countries API did not seem to have these fields available.  I checked the GitHub repository for the project, and I wasn't able to find any mention of these fields (https://github.com/trevorblades/countries/blob/main/src/schema.ts).  I did not end up implementing those fields, or features related to those fields, as I would have had to use an additional API, which was not specified in the requirements.  Additionally, the area value was not available through the API either, so I did not implement the filtering by area.