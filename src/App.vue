<template>
	<v-app>
		<navbar />

		<v-main>
			<v-container>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Navbar from 'Components/Navbar';
export default {
	name: 'App',

	components: {
		Navbar,
	},
};
</script>
