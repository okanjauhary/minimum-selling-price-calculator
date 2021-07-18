<template>
	<div class="history">
		<div
			v-if="!totalHistory"
			class="d-flex justify-center flex-column align-center empty-state"
		>
			<div class="text-h6 mb-3">Anda belum melakukan perhitungan</div>
			<v-btn :to="{ name: 'Home' }" color="success" class="mx-auto"
				>Mulai menghitung</v-btn
			>
		</div>

		<template v-else>
			<v-row>
				<v-col cols="12" class="mb-">
					<div>
						Berikut ini {{ totalHistory }} data perhitungan terakhir anda.
					</div>
				</v-col>
				<v-col
					v-for="(history, i) in histories"
					cols="12"
					:key="history.createdAt + i"
				>
					<v-card class="mx-auto" max-width="480">
						<v-list-item two-line>
							<v-list-item-content>
								<v-list-item-title class="d-flex justify-space-between">
									<div class="text-h5">{{ history.product.name }}</div>
									<div>
										<span class="title">
											{{ history.product.priceUnit | price }}
										</span>
										<span class="text--secondary">/kg</span>
									</div>
								</v-list-item-title>
								<v-list-item-subtitle>{{
									history.createdAt | date
								}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-list-item>
							<v-list-item-title> Jumlah pembelian </v-list-item-title>
							<v-list-item-title class="text-right">
								{{ history.product.totalProduct | tidy }}kg
							</v-list-item-title>
						</v-list-item>

						<v-list class="transparent">
							<v-list-item>
								<v-list-item-title class="mb-1">
									Biaya tambahan:
								</v-list-item-title>
							</v-list-item>
							<v-list-item v-if="!history.product.additionalFee.length">
								<v-list-item-subtitle>-</v-list-item-subtitle>
							</v-list-item>
							<template v-else>
								<v-list-item
									v-for="fee in history.product.additionalFee"
									:key="`additional-${fee.name}`"
								>
									<v-list-item-subtitle> {{ fee.name }} </v-list-item-subtitle>
									<v-list-item-title class="text-right">
										{{ fee.price | price }}
									</v-list-item-title>
								</v-list-item>
							</template>

							<v-divider></v-divider>

							<v-list-item>
								<v-list-item-subtitle> Peluang rusak </v-list-item-subtitle>
								<v-list-item-title class="text-right">
									{{ history.product.rejectionPersentage || 0 }}%
								</v-list-item-title>
							</v-list-item>

							<v-divider></v-divider>

							<v-list-item>
								<div class="subtitle-1">
									Harga minimum penjualan:
									<b class="blue--text">{{
										sellingPrice(history.product) | price
									}}</b>
								</div>
							</v-list-item>
						</v-list>
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<v-btn color="error" block large text @click="clearHistory">
						<v-icon>mdi-trash-can</v-icon>&nbsp; Kosongkan history
					</v-btn>
				</v-col>
			</v-row>
		</template>
	</div>
</template>
<script>
import minimumSellingPrice from 'Utils/minimumSellingPrice';
import { tidy } from 'Utils/formatter';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default {
	name: 'History',

	computed: {
		histories() {
			return this.$store.state.history;
		},
		totalHistory() {
			return this.$store.getters.getTotalHistory;
		},
		sellingPrice() {
			return minimumSellingPrice;
		},
	},

	filters: {
		date: value => dayjs(value).format('dddd, D MMM YYYY, mm:HH'),
		price: value => 'Rp ' + tidy(value),
		tidy: value => tidy(value),
	},

	mounted() {
		if (this.$store.getters.getNotVisibleHistory) {
			this.$store.commit('setAllHistoryVisible');
		}
	},

	methods: {
		clearHistory() {
			this.$store.commit('clearHistory');
		},
	},
};
</script>

<style lang="scss" scoped>
.history {
	height: calc(100vh - 100px);
	position: relative;

	.empty-state {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
}
</style>