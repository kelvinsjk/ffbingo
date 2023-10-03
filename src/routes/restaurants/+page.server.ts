export const load = async ({ locals: { supabase } }) => {
	const { data } = await supabase
		.from('bingo-answers')
		.select('*')
		.eq('id', import.meta.env.VITE_REVEALED_ID);
	const revealed = data && data.length > 0 ? data[0].revealed : [];
	return {
		revealed
	};
};
