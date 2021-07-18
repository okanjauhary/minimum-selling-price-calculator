<template>
	<v-app-bar app color="success" dark>
		<div class="d-flex align-center">
			<v-btn
				v-if="previousPage"
				text
				class="mr-2"
				icon
				@click="goToPage(previousPage)"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<h3 class="page-title">{{ title }}</h3>
		</div>

		<v-spacer />

		<v-btn
			v-if="isHome"
			text
			class="mr-2"
			icon
			dark
			@click="goToPage('History')"
		>
			<v-badge
				:value="!!getTotalHistory"
				color="error"
				:content="getTotalHistory"
				offset-y="10"
			>
				<v-icon>mdi-history</v-icon>
			</v-badge>
		</v-btn>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Navbar',

	computed: {
		...mapGetters(['getTotalHistory']),
		previousPage() {
			return this.$route.meta.back || '';
		},
		title() {
			return this.$route.meta.title || '';
		},
		isHome() {
			return this.$route.name === 'Home';
		},
	},

	methods: {
		goToPage(name) {
			this.$router.push({ name });
		},
	},
};
</script>
