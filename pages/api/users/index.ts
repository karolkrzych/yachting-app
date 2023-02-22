import { FieldSet, Records } from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import createUser from 'services/users/createUser';

interface Data {
    status: string;
    user: Records<FieldSet>;
}

interface PostUserErrorResponse {
    status: string;
    error: unknown;
}

type ResponseType = Data | PostUserErrorResponse;

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) => {
    switch (req.method) {
        case 'POST': {
            try {
                const payload = req.body;
                const user = await createUser(payload);

                res.status(200).json({ status: 'created', user });
            } catch (err) {
                res.status(422).json({ status: 'not_created', error: err });
            }
            break;
        }
        default:
            res.status(400);
    }
};
