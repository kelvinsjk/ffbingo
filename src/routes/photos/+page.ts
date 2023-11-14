import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/signin');
	}

	const { data } = await supabase
		.from('bingo')
		.select(`guesses_attempted`)
		.eq('user_id', session.user.id)
		.limit(1);

	const guesses_attempted = data?.[0]?.guesses_attempted ?? 0;
	return {
		guesses_attempted,
	};
};
