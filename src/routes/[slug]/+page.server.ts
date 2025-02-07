import { getValue } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, cookies }) => {

    const db = platform?.env.DB;
    if(!db) {
        return {
            id: params.slug,
            error: 'db not found',
        }
    }

    let errorReturn = undefined;

    const url = await getValue(params.slug, db).catch(r => {
        errorReturn = {
            id: params.slug,
            error: r
        }
    });

    if(errorReturn) {
        return errorReturn;
    } else if(url) {
        redirect(307, url);
    }

	return {
        id: params.slug,
        url: url
    }
};