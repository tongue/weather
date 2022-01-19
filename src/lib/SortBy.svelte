<script lang="ts">
	import type { SortingMethod } from './weather';

	export let title: string;
	export let methods: SortingMethod[];
	export let disabled: boolean;
	export let onChange: (method: SortingMethod) => () => void;
</script>

<form>
	<fieldset {disabled}>
		<label for="sort">{title}</label>
		{#each methods as method, index}
			<input
				type="radio"
				name="sort"
				value={method.method}
				id={method.method}
				checked={index === 0}
				on:change={onChange(method)}
			/>
			<label for={method.method}>{method.label}</label>
		{/each}
	</fieldset>
</form>

<style>
	fieldset {
		display: flex;
		align-items: center;
		justify-content: end;
	}

	label[for='sort']::after {
		content: ':';
		margin-right: var(--spacing-xs);
	}

	label {
		cursor: pointer;
	}

	input[type='radio'] + label {
		display: inline-flex;
		align-items: center;
		padding: 0 var(--spacing-xs);
		height: var(--spacing-l);
		border-radius: var(--border-radius-s);

		background-color: var(--color-negative);
	}

	input[type='radio']:checked + label {
		background-color: var(--color-foreground);
		color: var(--color-negative);
	}
</style>
