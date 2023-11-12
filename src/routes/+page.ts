import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/signin');
	}

	const { data } = await supabase.from('bingo').select(`
		user_id,
		entry,
		guesses_correct,
		guesses_attempted
	`);

	const { data: answers } = await supabase
		.from('bingo_answers')
		.select('id, revealed, latest')
		.order('id', { ascending: true });

	const user = session.user.id;

	const others = data?.filter(
		(e) => e.user_id !== user && e.user_id !== '05404d08-6428-4ef5-9173-1c21a4a9cdf8'
	) as { user_id: string; entry: number[]; guesses_attempted: number; guesses_correct: number }[];

	const entry = data?.filter((e) => e.user_id === user)[0].entry as number[];
	const guesses_attempted = data?.filter((e) => e.user_id === user)[0].guesses_attempted as number;
	const guesses_correct = data?.filter((e) => e.user_id === user)[0].guesses_correct as number;

	return {
		user,
		entry,
		others,
		answers,
		guesses_attempted,
		guesses_correct,
		supabase
	};
};
