<template>
	<div>
		<div class="tiles">
			<div class="tiles__margin">
				<router-link 	tag="div" 
								:to="'/article/' + tile.id"
								v-for="tile in tiles"
								class="tile"
								v-show="!serverError"
								:key="tile.id"
								:class="{'tile__wide' : tile.type == 'double'}">

					<div class="tile__in">
						<div class="tile__img">
							<img :src="placePic(tile.type)" alt="">
							
							<div class="tile__addon">
								<div class="tile__title">
									{{ tile.title }}
								</div>

								<div class="tile__description">
									{{ tile.description }}
								</div>
							</div>
						</div>
					</div>
				</router-link>
			</div>

			<div v-show="serverError" class="tiles__nodata">
				Данные, к сожалению, не загружены.
				<br>
				Попробуйте обновить страницу
			</div>

			<div v-show="serverError" class="tiles__ajaxerror">
				{{ serverErrorText }}
			</div>
		</div>
	</div>
</template>

<script>
	import Vuex from 'vuex';
	// import { mapState } from 'vuex';
	import axios from 'axios';

	export default {
		data() {
			return {
				kittenImg: 'http://placekitten.com/g/380/380',
				kittenImgDouble: 'http://placekitten.com/g/810/380',
				tiles: [],
				serverTiles: [],
				window: {
					width: 0
				},
				serverError: false,
				serverErrorText: ''
			}
		},
		methods: {
			placePic(type) {
				if (type == 'normal') {
					return this.kittenImg;
				} else if (type == 'double') {
					return this.kittenImgDouble;
				}
			},
			reorder(tiles, deviceType) {
				let spool = [],
					tilesUpdated = [],
					counter = 0,
					modul = 0;

				// по девайсу решаем кратное количество плиток до добавления двойной
				if (deviceType == 'tablet') {
					modul = 2;
				} else if (deviceType == 'desktop') {
					modul = 3;
				}

				tiles.forEach((item, index) => {
					if (spool.length > 0) {
						if (counter % modul == 0 || counter == 0) {
							counter += 2;
							spool.forEach((item_spool, index) => {
								tilesUpdated.push(item_spool);
								spool.splice(spool.indexOf(index), 1);
							})
						}
					}

					if (item.type == 'normal') {
						counter++;
						
						tilesUpdated.push(item);
					} else {
						if (counter % modul == 0 || counter == 0) {
							counter += 2;
							tilesUpdated.push(item);
						} else {
							spool.push(item);
						}
					}
				})

				if (spool.length > 0) {
					spool.forEach((item_spool, index) => {
						tilesUpdated.push(item_spool);
						spool.splice(spool.indexOf(index), 1);
					})
				}
				
				return tilesUpdated;
			},
			loadTiles(response) {
				// функция для смены ориентации/смены размера (обновление/порядок плиток)
				this.window.width = window.innerWidth;

				if (this.window.width > 480 && this.window.width <= 1024) {
					this.tiles = this.reorder(response, 'tablet');
					this.$store.commit('setTiles', this.reorder(response, 'tablet'));
				} else {
					this.tiles = this.reorder(response, 'desktop');
					this.$store.commit('setTiles', this.reorder(response, 'desktop'));
				}
			},
			getTiles() {
				let self = this;

				axios.get('/api/tiles')
					.then((response) => {
						self.$store.commit('setTiles', response.data.tiles);
						self.tiles = response.data.tiles;
						self.serverTiles = response.data.tiles;

						return response.data.tiles;
					})
					.then((response) => {
						this.loadTiles(response);
					})
					.catch(function (error) {
						let errorText = error.data.error;

						if (errorText.length > 0) {
							self.serverError = true;
							self.serverErrorText = errorText;
						}
					})
			}
		},
		created() {
			// this.$store.dispatch('loadData');
			if (Object.keys(this.$store.state.tiles).length == 0) {
				this.getTiles();
			} else {
				this.tiles = this.$store.state.tiles;
			}
		},
		mounted() {
			let interval;

			window.addEventListener('resize', ()=> {
				clearInterval(interval);
				interval = setInterval(()=> {
					this.loadTiles(this.$store.state.serverTiles);

					clearInterval(interval);
				}, 300);
			});
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.loadTiles(this.$store.state.serverTiles));
		},
	}
</script>

<style>
	
</style>