<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>Weather app | About this app</title>
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere architecto dolor itaque
		excepturi nesciunt, sit nihil aliquid fugit impedit, laborum natus minima consequuntur quam
		perferendis numquam earum minus velit deleniti?
	</p>
</div>
