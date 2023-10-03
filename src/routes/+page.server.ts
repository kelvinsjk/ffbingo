import shuffle from 'lodash/shuffle';

export const load = async ({ locals: { supabase } }) => {
	let { data } = await supabase
		.from('bingo')
		.select('*')
		.eq('user_id', import.meta.env.VITE_UID1);

	const all = Array.from(Array(40).keys());
	let entries = shuffle(all).slice(0, 24);
	if (data && data.length > 0) {
		if (data[0].valid) {
			entries = data[0].entries;
		}
	}

	({ data } = await supabase
		.from('bingo-answers')
		.select('*')
		.eq('id', import.meta.env.VITE_REVEALED_ID));
	const revealed = data && data.length > 0 ? data[0].revealed : [];
	return {
		entries,
		revealed
	};
};
