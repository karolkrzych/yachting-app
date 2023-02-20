import { FieldSet, Records } from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import getRecentOffers from 'services/offers/getRecent';
import createOffer from 'services/offers/createOffer';

interface PostOfferReposne {
    status: string;
    offer: Records<FieldSet>;
}

interface PostErrorResponse {
    status: string;
    error: unknown;
}

type ResponseType = FieldSet[] | PostOfferReposne | PostErrorResponse;

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
            try {
                const payload = req.body;
                console.log('payload backend', payload);
                const offer = await createOffer(payload);
                res.status(200).json({ status: 'created', offer });
            } catch (err) {
                res.status(422).json({ status: 'not_created', error: err });
            }

            break;
        }

        default:
            res.status(400);
    }
};
