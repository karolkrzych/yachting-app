import airDB from 'services/airtableClient';
import { Offer } from 'types/offers';

const createOffer = async (payload: Offer) => {
    const offer = await airDB('offers').create([
        {
            fields: {
                ...payload,
                price: Number(payload.price),
                status: 'inactive',
            },
        },
    ]);

    return offer;
};

export default createOffer;
