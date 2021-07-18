<template>
	<div class="home mb-10">
		<div class="my-5">
			<p>Mari hitung minimal harga penjualan agar kamu tidak rugi 😘</p>
		</div>

		<v-form ref="form" @submit.prevent="calculate">
			<v-row no-gutters>
				<v-col cols="12">
					<v-text-field
						v-model="product.name"
						:rules="[rules.required]"
						label="Nama Produk *"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model.number="product.priceUnit"
						label="Harga per kilogram (kg) *"
						prefix="Rp"
						:rules="[rules.required, rules.number]"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model.number="product.totalProduct"
						label="Jumlah barang pembelian *"
						suffix="Kg"
						:rules="[rules.required, rules.number]"
					/>
				</v-col>

				<v-col cols="12" class="mb-5 mt-10">
					<div class="title d-flex align-center">
						<v-icon size="30">mdi-cash-plus</v-icon>&nbsp;Biaya Tambahan
					</div>
					<p class="mb-0 text--secondary">
						tambah biaya tambahan seperti biaya transportasi, konsumsi dan
						lain-lain.
					</p>
				</v-col>

				<template v-if="product.additionalFee.length">
					<v-col
						v-for="(fee, i) in product.additionalFee"
						cols="12"
						class="mb-6"
						:key="`fee-${i}`"
					>
						<v-card class="additinal-fee">
							<v-card-title>
								<div>#{{ i + 1 }}</div>
								<v-spacer />
								<v-btn text @click="deleteAdditinalFee(i)">
									<v-icon>mdi-trash-can</v-icon>
									Hapus
								</v-btn>
							</v-card-title>
							<v-divider />
							<v-card-text class="py-7">
								<v-row>
									<v-col cols="6">
										<v-text-field v-model.lazy="fee.name" label="Nama biaya" />
									</v-col>
									<v-col cols="6">
										<v-text-field
											v-model.number="fee.price"
											label="Jumlah biaya"
											prefix="Rp"
											:rules="[rules.number]"
										/>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
				</template>

				<v-col cols="12">
					<v-btn color="primary" outlined block @click="additinalFee">
						<v-icon>mdi-plus</v-icon>
						Tambah biaya tambahan
					</v-btn>
				</v-col>

				<v-col cols="12" class="mb-5 mt-10">
					<div class="title">
						<v-icon>mdi-heart-broken</v-icon>&nbsp;barang rusak
					</div>
					<p class="mb-0 text--secondary">
						Tambah persentasi kemungkinan barang yang anda beli mengalami
						kerusakan.
					</p>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model.number="product.rejectionPersentage"
						label="Persentasi barang rusak"
						suffix="%"
						:rules="[rules.number]"
					/>
				</v-col>

				<v-col cols="12" class="mt-10 mb-5">
					<div
						v-if="loading"
						class="loading-cuy"
						data-text="Sek tak itunge boooss..."
					>
						Sek tak itunge boooss...
					</div>
					<h3 v-if="result && !loading">
						Hasilnya adalah
						<strong class="blue--text">Rp {{ result | tidy }}</strong>
					</h3>
				</v-col>

				<v-col cols="12">
					<v-btn type="submit" color="success" large block :loading="loading">
						Eksekusi nggeerrrr!!!
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script>
import minimumSellingPrice from 'Utils/minimumSellingPrice';
import { tidy } from 'Utils/formatter';
import { mapMutations } from 'vuex';
import dayjs from 'dayjs';

export default {
	name: 'Home',

	data() {
		return {
			rules: {
				required: value => !!value || 'Harus diisi booooss!!!',
				number: value => isFinite(value) || 'Harus angka broo',
			},
			product: {
				name: '',
				priceUnit: null,
				totalProduct: null,
				additionalFee: [],
				rejectionPersentage: null,
			},
			loading: false,
			result: 0,
		};
	},

	filters: {
		tidy: value => tidy(value),
	},

	methods: {
		...mapMutations(['setHistory']),
		additinalFee() {
			this.product.additionalFee.push({
				name: '',
				price: null,
			});
		},
		deleteAdditinalFee(index) {
			this.product.additionalFee.splice(index, 1);
		},
		calculate() {
			const isValid = this.$refs.form.validate();
			if (isValid) {
				this.loading = true;
				const result = minimumSellingPrice({ ...this.product });

				setTimeout(() => {
					this.setHistory({
						product: this.product,
						visible: false,
						createdAt: dayjs().toString(),
					});
					this.result = result;
					this.loading = false;
				}, 2000);
			}
		},
	},
};
</script>
<style lang="scss">
.additinal-fee.v-card {
	.v-text-field__details {
		display: none !important;
	}
}

.loading-cuy {
	color: #bbb;
	font-size: 18px;
	font-weight: bold;
	position: relative;

	&::before {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		color: #1976d2;
		animation: load 2s linear infinite;
		overflow: hidden;
	}

	@keyframes load {
		from {
			width: 0;
		}

		to {
			width: 100%;
		}
	}
}
</style>