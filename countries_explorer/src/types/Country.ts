//This  file contains the interface definiton for the country type, ensuring type safety when interacting with this type
export interface Country {
    name: string;
    capital: string;
    continent: string;
    emoji: string;
    languages: string[];
    currency: string[];
}