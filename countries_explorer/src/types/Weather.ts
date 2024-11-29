//This  file contains the interface definiton for the weather type, ensuring type safety when interacting with this type
export interface weather {
    temperature: number;
    condition: string;
    icon: string;
}