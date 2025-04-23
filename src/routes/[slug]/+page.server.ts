import { getValue, isFlagged } from '$lib';
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

    const isUrlFlagged = isFlagged(url ?? '');

    if(errorReturn) {
        return errorReturn;
    } else if(url && !isUrlFlagged) {
        redirect(307, url);
    }

	return {
        id: params.slug,
        url: url,
        isFlagged: isUrlFlagged
    }
};