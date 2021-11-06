<template>
	<div>
		<div class="article" :class="{'article__wide' : tile.type == 'double'}">
			<div class="article__id">
				#{{ id }}
			</div>

			<div class="article__content">
				<div class="article__img">
					<img :src="getImage(tile.type)" alt="">
					
					<div class="article__img-border"></div>
				</div>
				
				<div class="article__text">
					<div class="article__title">{{ tile.title }}</div>
					
					{{ tile.text }}
				</div>
			</div>

			<router-link tag="a" to="/" class="article__return">
				На главную
			</router-link>

			<div v-show="nodata" class="article__nodata">
				Данные, к сожалению, не загружены.
				<br>
				Попробуйте обновить страницу
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				id: this.$route.params.id,
				kittenImg: 'http://placekitten.com/g/380/380',
				kittenImgDouble: 'http://placekitten.com/g/810/380',
				tiles: {},
				tile: {},
				nodata: false
			}
		},
		created() {
			if (Object.keys(this.$store.state.tiles).length == 0) {
				this.getTiles();
			} else {
				this.tiles = this.$store.state.tiles;

				this.tiles.forEach((item) => {
					if (item.id == this.id) {
						this.tile = item;
					}
				})
			}
		},
		methods: {
			getTiles() {
				axios.get('/api/tiles')
					.then((response) => {
						// здесь нужен POST запрос на сервер к статье с нужным id, но пока запросим все и перебором выберем нужный.
						// тем более в json массив начинается с 0 при id = 1, видимо специально для теста (привет, коллега!)
						if (response.data.success) {
							this.tiles = response.data.tiles;

							this.tiles.forEach((item) => {
								if (item.id == this.id) {
									this.tile = item;
								}
							})
						} else {
							this.nodata = true;
						}
					});
			},
			getImage(type) {
				if (type == 'normal') {
					return this.kittenImg;
				} else if (type == 'double'){
					return this.kittenImgDouble;
				}
			}
		}
	}
</script>

<style>

</style>