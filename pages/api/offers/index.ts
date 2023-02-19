import { FieldSet } from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import getRecentOffers from 'services/offers/getRecent';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<FieldSet[]>
) => {
    const offers = await getRecentOffers(4);
    res.status(200).json(offers);
};
 