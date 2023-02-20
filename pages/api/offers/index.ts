import { FieldSet, Records } from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import getRecentOffers from 'services/offers/getRecent';
import createOffer from 'services/offers/createOffer';

interface PostOfferReposne {
    status: string;
    offer: Records<FieldSet>;
}

type ResponseType = FieldSet[] | PostOfferReposne;

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) => {
    switch (req.method) {
        case 'GET': {
            const offers = await getRecentOffers(4);
            res.status(200).json(offers);

            break;
        }

        case 'POST': {
            const payload = req.body;
            const offer = await createOffer(payload);
            res.status(200).json({ status: 'created', offer });

            break;
        }

        default:
            res.status(400);
    }
};
