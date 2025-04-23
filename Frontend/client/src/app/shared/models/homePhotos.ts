import { Home } from "./home";

export interface HomePhotos {
    id: number;
    photo: string;
    homeId: number;
    home: Home;
}