<script lang="ts">
	import { enhance } from '$app/forms';
	let email: string;
	$: invalidEmail =
		!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email?.toLowerCase()
		);
</script>

<main class="prose">
	<h2>Log in</h2>
	<form method="POST" use:enhance>
		<div>
			<label>
				Email:
				<input
					bind:value={email}
					type="email"
					name="email"
					placeholder="Email"
					class="input w-full max-w-xs"
				/>
			</label>
			{#if email !== undefined && invalidEmail}
				<p class="text-red-500">Please enter a valid email address.</p>
			{/if}
		</div>
		<div>
			<label>
				Password:
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="input w-full max-w-xs"
				/>
			</label>
		</div>
		<div class="mt-4">
			<button class="btn btn-primary" type="submit"> Sign in</button>
		</div>
	</form>
</main>

<style>
	main {
		margin: 1em;
	}
</style>
