<script lang="ts">
	import type { City } from '$lib/types';
	import { cities } from '$lib/cities';
	import { fetchJson, debounce, cityAndCountryFromString, isCity } from '$lib/utils';

	export let wait = 1000;

	let form: HTMLFormElement;
	let pending = false;
	let suggestionsPromise: Promise<City[]> = Promise.resolve([]);
	let error: string | undefined = undefined;

	const cleanUp = () =>
		setTimeout(() => {
			form.reset();
		}, 0);

	const updateSuggestions = debounce((name: string): void => {
		suggestionsPromise = fetchJson<City[]>('cities', name);
	}, wait);

	const validate = (str: string): [string, string] | undefined => {
		error = undefined;
		const cityAndCountry = cityAndCountryFromString(str);
		if (!cityAndCountry) {
			error = 'Not a valid city';
			return undefined;
		}
		if ($cities.find(isCity(...cityAndCountry))) {
			error = `"${str}" is already added to the list.`;
			return undefined;
		}
		return cityAndCountry;
	};

	const addCity = (cityAndCountry: string): void => {
		const validatedCityAndCountry = validate(cityAndCountry);
		if (validatedCityAndCountry) {
			cities.add(...validatedCityAndCountry);
		}
	};

	const onInput = (event: Event): void => {
		if (event instanceof InputEvent && event.target instanceof HTMLInputElement) {
			const { value } = event.target;
			if (event.inputType === 'insertReplacementText' && event.data) {
				cleanUp();
				addCity(event.data);
			} else if (value.length > 0) {
				updateSuggestions(value);
			}
		}
	};
</script>

<form
	bind:this={form}
	action="/cities"
	method="post"
	on:submit|preventDefault
	aria-owns="weather-list"
>
	{#if error}
		<div id="city-error" role="alert">
			<p>{error}</p>
		</div>
	{/if}
	<fieldset>
		<label for="place">Plats</label>
		<input
			list="suggestions"
			id="place"
			type="text"
			name="city"
			placeholder="Stockholm, Sweden"
			autocomplete="off"
			on:input|preventDefault={onInput}
		/>
		<datalist id="suggestions">
			{#await suggestionsPromise then suggestions}
				{#each suggestions as { name, country }}
					<option value={`${name}, ${country}`} />
				{/each}
			{/await}
		</datalist>
		{#await suggestionsPromise}
			<button type="submit" class:pending disabled>
				<span class="hidden"> Söker </span>
			</button>
		{:then _}
			<button type="submit">
				<span class="hidden"> Lägg till </span>
			</button>
		{/await}
	</fieldset>
</form>

<style>
	form {
		grid-area: form;
		display: flex;
		justify-content: center;
	}

	fieldset {
		display: grid;
		grid-template-columns: min-content minmax(7rem, auto) min-content;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-s);
		background-color: var(--color-negative);
		border: 0;
		border-radius: var(--border-radius-m);
		width: 100%;
		max-width: 38rem;
	}

	label,
	input {
		font-size: var(--size-l);
	}

	label {
		font-weight: var(--weight-bold);
	}

	label::after {
		content: ':';
	}

	fieldset button {
		background-image: url(plus.svg);
		width: 1.5em;
		height: 1.5em;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.pending {
		animation: rotate 750ms linear infinite;
	}

	input {
		color: var(--color-foreground);
	}

	div[role='alert'] {
		margin-bottom: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-s);

		color: var(--color-negative);
		background-color: var(--color-alert);

		border-radius: var(--border-radius-m);
	}
</style>
