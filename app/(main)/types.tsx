export interface IService {
    id: string;
    name: string;
}

export interface IArticle {
    id: string;
    name: string;
    content: string;
    serviceId: string;
}

export interface IRegion {
    id: string;
    name: string;
}