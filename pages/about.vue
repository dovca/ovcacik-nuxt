<template>
	<main class="about page">
		<div class="about__content page__content">
			<h1 class="about__title page__title">About</h1>

			<p class="about__text">
				Welcome to my home, stranger, come in. Please take your shoes off.
			</p>

			<p class="about__text">
				Yes, you are indeed in my home. This website is currently running on a pocket-sized
				computer under my ironing board in the hall. Would you like a coffee? We've run out of cookies though.
			</p>

			<p class="about__text">
				Sorry for not introducing myself. I am David Ovčačík. I mostly write code and listen to music.
				I love writing code and listening to music. Do you?
			</p>

			<p class="about__text">
				Anyway, feel free to look around...
			</p>
		</div>
	</main>
</template>

<script>
	import pageTransitions from '~/mixins/pageTransitions';

	export default {
		name: 'AboutPage',
		...pageTransitions
	};
</script>

<style scoped lang="scss">
	.about__text {
		max-width: 20rem;
		text-align: left;
		margin-top: 1em;
	}
</style>
