<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header role="banner">
	<h1>Hur är vädret i…</h1>
</header>
<slot />
<footer>
	<a sveltekit:prefetch href={$page.path === '/' ? '/about' : '/'}>
		<img src="logo.svg" title="Isotop AB" alt="Isotop logotype" />
	</a>
</footer>

<style>
	:global(body),
	:global(form),
	:global(ol),
	:global(li),
	:global(p),
	:global(h1),
	:global(table),
	:global(tbody),
	:global(caption),
	:global(tr),
	:global(th),
	:global(td),
	:global(input),
	:global(button),
	:global(label),
	:global(fieldset),
	:global(header),
	:global(main),
	:global(footer),
	:global(article),
	:global(h2),
	:global(abbr) {
		all: unset;
	}

	:global(:root) {
		--color-base-pale: #eeeeee;
		--color-base-black: #000000;
		--color-base-white: #ffffff;
		--color-brand-yellow: #fac710;
		--color-brand-red: #f24726;
		--color-brand-blue: #2d9bf0;
		--color-brand-blue-sky: #75d5ee;
		--color-brand-green: #8fd14f;

		--color-foreground: var(--color-base-black);
		--color-background: var(--color-base-pale);
		--color-negative: var(--color-base-white);
		--color-highlight: var(--color-brand-blue-sky);
		--color-alert: var(--color-brand-red);
		--color-cold: var(--color-brand-blue);
		--color-neutral: var(--color-brand-yellow);
		--color-hot: var(--color-brand-red);

		--border-radius-round: 1000px;
		--border-radius-m: 5px;
		--border-radius-s: 2px;

		--size-3xl: 4rem;
		--size-2xl: 3rem;
		--size-xl: 2rem;
		--size-l: 1.25rem;
		--size-m: 1rem;
		--size-s: 0.75rem;

		--size-heading: var(--size-xl);
		--size-input: var(--size-l);
		--size-body: var(--size-m);
		--size-display: var(--size-2xl);

		--weight-regular: 500;
		--weight-bold: 800;

		--spacing-xl: 3rem;
		--spacing-l: 2rem;
		--spacing-m: 1.5rem;
		--spacing-s: 1rem;
		--spacing-xs: 0.5rem;

		--spacing-gap: var(--spacing-m);
	}

	@media screen and (min-width: 48em) {
		:global(:root) {
			--size-body: var(--size-l);
			--size-display: var(--size-3xl);
			--spacing-gap: var(--spacing-l);
		}
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(*:before),
	:global(*:after) {
		box-sizing: inherit;
	}

	:global(body) {
		display: flex;
		justify-content: center;
		padding-left: var(--spacing-gap);
		padding-right: var(--spacing-gap);

		font-family: Roboto;
		font-weight: 500;

		background-color: var(--color-background);
	}

	:global(#svelte) {
		grid-area: app;
		display: grid;
		min-height: 100vh;
		grid-template-rows:
			minmax(var(--spacing-gap), auto) min-content var(--spacing-gap) min-content var(--spacing-gap)
			auto minmax(var(--spacing-gap), auto)
			min-content var(--spacing-gap);
		grid-template-areas: '.' 'header' '.' 'form' '.' 'main' '.' 'footer' '.';
		width: 100%;
	}

	@media (min-width: 48em) {
		:global(#svelte) {
			max-width: 75rem;
		}
	}

	:global(.hidden) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	:global(button) {
		cursor: pointer;
	}

	header {
		grid-area: header;
	}

	h1 {
		display: block;
		text-align: center;
		font-size: var(--size-heading);
		font-weight: var(--weight-bold);
	}

	footer {
		grid-area: footer;
		display: flex;
		justify-content: center;
	}
</style>
