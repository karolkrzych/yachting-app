import airDB from 'services/airtableClient';

export const getSingleOffer = async (id: string) => {
    const offers = await airDB('offers')
        .select({
            filterByFormula: `id="${id}"`,
        })
        .firstPage();

    if (offers && offers[0]) {
        return offers[0].fields;
    }
};
