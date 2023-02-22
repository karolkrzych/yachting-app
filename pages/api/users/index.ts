import { FieldSet, Records } from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next';
import createUser from 'services/users/createUser';

interface Data {
    status: string;
    user: Records<FieldSet>;
}

interface PostUserErrorResponse {
    status: string;
    errorMsg: string;
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
                const error = err as unknown as Error;
                res.status(422).json({
                    status: 'not_created',
                    errorMsg: error.message,
                });
            }
            break;
        }
        default:
            res.status(400);
    }
};
