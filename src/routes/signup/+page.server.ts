import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({
		request,
		//url,
		locals: { supabase }
	}) => {
		const formData = await request.formData();
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		const emailRegEx =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const validEmail = emailRegEx.test(email.toLowerCase());
		if (validEmail && email && password) {
			const {
				//data,
				error
			} = await supabase.auth.signUp({
				email,
				password
				//options: {
				//	emailRedirectTo: `${url.origin}/auth/callback`
				//}
			});
			if (error) {
				return fail(500, { message: 'Server error. Try again later.', success: false, email });
			}

			throw redirect(303, '/play');
		} else {
			console.log('Invalid email');
		}
	}
} satisfies Actions;
