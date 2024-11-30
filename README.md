# countries_explorer
This repository contains my efforts towards a coding task

Note on API Rate Limits:
Due to the design of my application (minimizing API calls through caching country data), the rate limits present for both APIs are high enough that my application should not exceed them through normal use.
OpenWeather API - 60 calls per minute
Countries GraphQL API - No rate limit specified

Architecture and Design
The architecture of the application follows the standard React component based architecture. Where possible, components are used to increase maintainability and decrease repetitive code.  For example, each country displayed in the scrollable list is a CountryCard -  a reusable component.  The front end is in React, using Tailwind css for styling.  I selected Tailwind for the styling as it is easy to implement, and quite readable once understood.  Additionally, Tailwind's documentation is very easy to read and learn from.  Then, TypeScript is used for the logic of the application.  TypeScript is used to ensure type safety when working with the data consumed from the Countries API and the Weather API. Using type definitions (Country.ts and Weather.ts respectively), types are explicitly declared, which provides a type safety that is not present in vanilla JavaScript.  This is beneficial, as if unexpected or incorrect data ever enters the application, the types are declared, so errors will be thrown if incorrect types are present.

The country data is received using a single GraphQL query, and then cached. This minimizes the number of API calls required for the application, as the country data is cached once queried. The weather data is not managed in the same way, it uses RESTful API calls to retrieve the weather data on demand.  Given the rate limit is 60 calls per minute, it was not required to limit the user from making too many requests in this case.

Challenges Faced
As I face challenges throughout the development process, I will include them here.

The first challenge I faced was that I had never used TypeScript for any application before. I had seen some basic examples of it, and had a basic understanding of what it is used for, but I had never used it.  I referred to TypeScript documentation and used ChatGPT for basic examples and basic features.

Once I completed the basic implementation, I ran into some issues with some of the required fields.  For example, the countries API did not seem to have a region field, population field, and timezone field.  To get around the region issue, I used the continent field. Using the continent field made some challenges, as I was able to retrieve the continent name, and then when I tried to filter by continent, no countries were being displayed.  I assumed was due to a type mismatch, as the continent comes as an object from the GraphQL query.  Using console logging, I found that the types were matching, so there must be another issue.  I resolved the error as I was treating the object as an array in some cases, when I had already converted it to a string.

The next issue I attempted to resolve was the previously mentioned issue regarding the Population, Borders, and Timezone fields.  The GraphQL Countries API did not seem to have these fields available.  I checked the GitHub repository for the project, and I wasn't able to find any mention of these fields (https://github.com/trevorblades/countries/blob/main/src/schema.ts).  I did not end up implementing those fields, or features related to those fields, as I would have had to use an additional API, which was not specified in the requirements.  Additionally, the area value was not available through the API either, so I did not implement the filtering by area.

Next Steps
If I had more time (no time limit was set, but I wanted to respect that this is usually a time-limited coding challenge), I would have loved to improve the user interface and implement a separate API for the population, borders, and timezone data.  Additionally, as this was mostly new to me, I didn't have time to implement testing for the application, and would like to learn how to do that in the future.

Setup Instructions:
1. Clone the Repository
2. Open in VS Code
3. Open a terminal in the project directory through VS Code.
4. Navigate to directory countries_explorer/countries_explorer (cd countries_explorer)
5. Run the command "npm install" to install all required dependencies
6. Add weather API key - in the .env file replace "YOUR_API_KEY" with a valid OpenWeatherMap API key.
7. Run the command "npm run dev" to start the application
8. CTRL-click on the link provided once the application starts, and view the application through a web browser