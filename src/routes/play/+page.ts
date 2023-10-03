import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/signin');
	}
	const { data } = await supabase.from('bingo').select('*').eq('user_id', session.user.id);

	let entries: (number | undefined)[] = new Array(24).fill(undefined);
	if (data && data.length > 0) {
		entries = data[0].entries;
	}

	return {
		user: session.user,
		entries,
		supabase,
		session
	};
};
