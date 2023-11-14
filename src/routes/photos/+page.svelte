<script lang="ts">
  import type { PageData } from './$types';
  import { answers } from '$lib/answers';

	export let data: PageData;
	const { guesses_attempted } = data;
  
  const items = [
	"McDonald's", // 0
	"Dunkin' Donuts", // 1
	'Burger King', // 2
	'Taco Bell', // 3
	"Wendy's", // 4
	'Dairy Queen', // 5
	'Little Caesars', // 6
	'KFC', // 7
	'Sonic', // 8
	 "Arby's", // 9
	 'Chipotle', // 10
	 "Jimmy John's", // 11
	 'Chick-fil-A', //! 12
	 'Panda Express', // 13
	 'Jack in the Box', // 14
	 'Panera Bread', // 15
	 'Jersey Mike', // 16
	 'Five Guys', // 17
	 'Firehouse Subs', // 18
	 'Zaxby', // 19
	 "Checkers and Rally's", // 20
	 "Culver's", // 21
	 'Bojangles', // 22
	 "Steak 'n Shake", // 23
	 "Freddy's Frozen Custard & Steakburgers", // 24
	 'Quiznos', // 25
	'Noodles & Company', // 26
	'Einstein Bros. Bagels', // 27
	'Jamba Juice', // 28
	"Applebee's", // 29
	'The Cheesecake Factory', // 30
	'Golden Corral', // 31
	"Denny's", // 32
	'IHOP', // 33
	'Waffle House', // 34
	 "Chili's", // 35
	 'Olive Garden', // 36
	 'Cracker Barrel', // 37
	 "Dickey's Barbecue Pit", // 38
	 'Texas Roadhouse / Longhorn Steakhouse', // 39
];
</script>

<main class="prose mx-auto">
  <h1>NPNT</h1>
  {#each Array.from(Array(guesses_attempted+1).keys()).slice(1) as no}
    <h2>Chain {no}</h2>
    <h3>{items[answers[no].latest ?? 0]}</h3>
    <div class="grid grid-cols-2">
      <img src="/answers/{no}a.png" alt="logo" />
      <img src="/answers/{no}b.png" alt="logo" />
    </div>
  {/each}
	<h2>Others</h2>
	<h3>Philly Cheese Steak</h3>
	<div class="grid grid-cols-2">
		<img src="/photos/philly-a.png" alt="logo" />
		<img src="/photos/philly-b.png" alt="logo" />
	</div>
</main>
