<template>
	<main class="websites page">
		<div class="websites__content page__content">
			<h1 class="websites__title page__title">Websites I worked on</h1>
			<ul class="websites__list">
				<li v-for="website in websites" :key="website.title" class="websites__list-item">
					<a
						v-if="website.url"
						:href="website.url"
						target="_blank"
						rel="noopener noreferrer"
						class="website__title link"
					>
						{{ website.title }}
					</a>
					<span v-else class="website__title website__title--subtle">
						{{ website.title }}
					</span>
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
	import pageTransitions from '~/mixins/pageTransitions';

	export default {
		name: 'WebsitesPage',
		...pageTransitions,

		fetch({store}) {
			return store.dispatch('websites/fetch');
		},

		computed: {
			websites() {
				return this.$store.state.websites.list;
			}
		},
	};
</script>

<style scoped lang="scss">
	.websites__list {
		margin-top: 2rem;
	}

	.websites__list-item {
		@include typo(h3);
		@include line-height(normal);
	}

	.website__title {
		&--subtle {
			color: $cDarkGray;
		}
	}
</style>
