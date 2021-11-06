import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		tiles: {},
		serverTiles: {},
		serverError: false,
		serverErrorText: ''
	},
	mutations: {
		setTiles(state, response) {
			state.tiles = response;
			state.serverTiles = response;
		}
	}
})