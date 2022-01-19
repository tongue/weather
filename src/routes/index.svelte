<script lang="ts">
	import AddCityForm from './_AddCityForm.svelte';
	import { cities } from '$lib/cities';
	import { sortedWeather, sort, sortingMethods, SortingMethod } from '$lib/weather';
	import WeatherCard from '$lib/WeatherCard.svelte';
	import SortBy from '$lib/SortBy.svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		easing: quintOut
	});

	type Remove = (name: string, country: string) => () => void;
	const remove: Remove = (name, country) => () => cities.remove(name, country);

	type ChangeSortingMethod = (method: SortingMethod) => () => void;
	const changeSortingMethod: ChangeSortingMethod = (method) => () => sort.set(method);

	$: pendingWeatherAmount = $cities.length - $sortedWeather.length;
</script>

<svelte:head>
	<title>Weather app</title>
</svelte:head>

<AddCityForm />
<main>
	<SortBy
		title="Sortera på temperatur"
		disabled={!$sortedWeather.length}
		methods={sortingMethods}
		onChange={changeSortingMethod}
	/>
	{#if $sortedWeather.length}
		<ol id="weather-list">
			{#each $sortedWeather as [city, weather] (city.name)}
				<li
					out:send={{ key: city.name }}
					in:receive={{ key: city.name }}
					animate:flip={{ duration: 320 }}
				>
					<WeatherCard {...city} {...weather} />
					<form
						on:submit|preventDefault={remove(city.name, city.country)}
						aria-controls="weather-list"
					>
						<button type="submit"><span class="hidden">Ta bort</span></button>
					</form>
				</li>
			{/each}
			{#if pendingWeatherAmount > 0}
				{#each Array(pendingWeatherAmount).fill(0) as _}
					<li>
						<article>Loading...</article>
					</li>
				{/each}
			{/if}
		</ol>
	{/if}
</main>

<style>
	main {
		grid-area: main;
	}

	ol {
		margin-top: var(--spacing-l);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
		gap: var(--spacing-gap);
	}

	li {
		display: block;
		position: relative;
	}

	li > form {
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		width: var(--spacing-m);

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--color-negative);
		border-radius: var(--border-radius-round);
	}

	button {
		background: no-repeat center/60% url(plus.svg);
		width: var(--spacing-m);
		aspect-ratio: 1 / 1;
		transform: rotate(45deg);
	}
</style>
