import { setValue } from '$lib';
import type { Actions, RequestEvent } from './$types';
export const actions = {
    default: async (event: RequestEvent) => {
        const start = performance.now();
        const form = await event.request.formData();
        const url = form.get('url') as string;

		console.log(url);

        const db = event.platform?.env.DB;
        if(!db) {
            console.log(performance.now() - start)
            return {
                error: 'db not found',
            }
        }
        let error = undefined;
        let key = undefined;

        if(url && URL.canParse(url)){
            key = await setValue(url, db).catch(r => {
                error = r;
            });
        }
        if(error) {
            return {
                error
            }
        } else if(key) {
            return {
                key
            }
        }
	}
} satisfies Actions;