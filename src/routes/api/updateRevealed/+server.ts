import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	console.log(session);
	const { revealed } = await request.json();
	const { data, error } = await supabase
		.from('bingo-answers')
		.update({ revealed })
		.eq('id', import.meta.env.VITE_REVEALED_ID)
		.select();
	if (error) {
		console.log(error);
	}
	console.log('revealed update', revealed, data, import.meta.env.VITE_REVEALED_ID);
	return json(revealed);
};
