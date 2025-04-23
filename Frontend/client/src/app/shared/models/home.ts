import { HomePhotos } from "./homePhotos";

export interface Home {
    id: number;
    title: string;
    description: string;
    homePhotos: HomePhotos[];

    photo: {
        $values: string[];
    };

}