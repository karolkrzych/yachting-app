export type Category = 'rent' | 'sale';

export type Status = 'active' | 'inactive';

export interface Offer {
    id: number;
    title: string;
    category: Category;
    mobile: string;
    price: number;
    description: string;
    location: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
}
