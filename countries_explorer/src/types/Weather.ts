//This  file contains the interface definiton for the weather type, ensuring type safety when interacting with this type
export interface Country {
    temperature: number;
    condition: string;
    icon: string;
}