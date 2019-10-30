<template>
	<main class="cv page">
		<div class="cv__content page__content">
			<h1 class="cv__title page__title">David Ovčačík</h1>
			<p class="cv__subtitle">
				<small>programmer, music enthusiast, food lover</small>
			</p>

			<section class="cv__block">
				<h2 class="cv__block-heading">languages</h2>
				<ul class="cv__languages">
					<li class="cv__languages-item">Czech</li>
					<li class="cv__languages-item">English</li>
					<li class="cv__languages-item">German</li>
					<li class="cv__languages-item">JavaScript</li>
					<li class="cv__languages-item">C/C++</li>
				</ul>
			</section>

			<section class="cv__block">
				<h2 class="cv__block-heading">education</h2>
				<ol class="cv__list">
					<li class="cv__list-item">
						<span class="cv__list-item-description">2005&ndash;2013</span>
						<span class="cv__list-item-text">Gymnázium Nad Kavalírkou</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2013&ndash;2017</span>
						<span class="cv__list-item-text">
							FIT ČVUT v Praze - Computer Engineering - Bachelor's degree
						</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2017&ndash;2018</span>
						<span class="cv__list-item-text">FIT ČVUT v Praze - Web Engineering</span>
					</li>
				</ol>
			</section>

			<section class="cv__block">
				<h2 class="cv__block-heading">work experience</h2>
				<ol class="cv__list">
					<li class="cv__list-item">
						<span class="cv__list-item-description">2011&ndash;2017</span>
						<span class="cv__list-item-text">DDM Praha 6 - Computer course lecturer</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2014&ndash;2016</span>
						<span class="cv__list-item-text">Storyous - Frontend Web Developer</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2016&ndash;2018</span>
						<span class="cv__list-item-text">Bistro Agency - Creative Coder</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2018&ndash;2019</span>
						<span class="cv__list-item-text">Isobar - Senior Creative Coder</span>
					</li>
					<li class="cv__list-item">
						<span class="cv__list-item-description">2019&ndash;present</span>
						<span class="cv__list-item-text">Windy - Senior Developer</span>
					</li>
				</ol>
			</section>

			<section class="cv__block">
				<h2 class="cv__block-heading">contact</h2>
				<ul class="cv__contact">
					<li class="cv__contact-item">
						<a
							href="mailto:david@ovcacik.xyz"
							title="E-mail"
							target="_blank"
							rel="noopener noreferrer"
							class="cv__contact-link link"
						>
							<span class="cv__contact-item-text">david@ovcacik.xyz</span>
							<span class="cv__contact-item-icon icon-email" />
						</a>
					</li>
					<li class="cv__contact-item">
						<a
							href="https://www.linkedin.com/in/david-ov%C4%8Da%C4%8D%C3%ADk-a94360b2"
							title="LinkedIn"
							target="_blank"
							rel="noopener noreferrer"
							class="cv__contact-link link"
						>
							<span class="cv__contact-item-text">linkedin.com/in/david-ovčačík-a94360b2</span>
							<span class="cv__contact-item-icon icon-linkedin" />
						</a>
					</li>
				</ul>
			</section>
		</div>
	</main>
</template>

<script>
	import pageTransitions from '~/mixins/pageTransitions';

	export default {
		name: 'CVPage',
		...pageTransitions
	};
</script>

<style scoped lang="scss">
	.cv__subtitle {
		@include line-height(small);
		@include golden-glow;

		color: $cHeading;
		font-size: 0.8rem;
	}

	.cv__languages {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.cv__languages-item {
		padding: 0 1em;
	}

	.cv__block {
		margin-top: 3em;
	}

	.cv__block-heading {
		@include typo(h2);
		@include golden-glow;

		margin-bottom: 0.5em;
		color: $cHeading;
	}

	.cv__list-item-description {
		display: inline-block;
		font-weight: $fwNormal;
		margin-right: 1em;
	}

	.cv__contact {
		display: flex;
		justify-content: center;
	}

	.cv__contact-item {
		padding: 0 0.5em;
	}

	.cv__contact-link {
		text-decoration: none;
		color: $cText;
	}

	.cv__contact-item-icon {
		font-size: 1.5rem;
	}

	.cv__contact-item-text {
		display: none;
	}

	@media screen and (max-width: $dTablet) {
		.cv__list-item + .cv__list-item {
			margin-top: 1em;
		}
		.cv__list-item-description {
			display: block;
		}
	}

	@media screen and (max-width: $dPhone) {
		.cv__languages-item {
			padding: 0 0.5em;
		}
	}

	@media print {
		html {
			font-size: 75%;
		}

		.cv,
		.cv__contact-link,
		.cv__contact-link:active,
		.cv__contact-link:visited {
			color: $cDarkerGray;
		}

		.cv__title,
		.cv__subtitle,
		.cv__block-heading {
			color: $cBlack;
		}

		.cv__contact {
			display: block;
		}

		.cv__contact-item-icon {
			display: none;
		}

		.cv__contact-item-text {
			display: inline;
		}
	}
</style>
