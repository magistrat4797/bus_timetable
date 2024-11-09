import { createStore } from 'vuex';
import axios from 'axios';
import { StateInterface, StopInterface } from '@/models/interfaces';

export default createStore<StateInterface>({
    state: {
        lines: [],
        stops: [],
        selectedLineStops: [],
        selectedLineNumber: null,
        selectedStop: { name: null, order: null }, // Obiekt z name i order
        isLoading: false,
        error: null
    },
    getters: {
        allLines(state): number[] {
            return [...new Set(state.lines)].sort((a, b) => a - b);
        },
        activeStops(state): StopInterface[] {
            const uniqueStops = Array.from(
                new Set(state.selectedLineStops.map((stop) => stop.stop))
            );
            return uniqueStops
                .map((stopName) => state.selectedLineStops.find((stop) => stop.stop === stopName))
                .filter((stop): stop is StopInterface => stop !== undefined);
        },
        activeTimes(state): string[] {
            if (!state.selectedStop.name) return [];

            let times = state.selectedLineStops
                .filter((s) => s.stop === state.selectedStop.name)
                .map((s) => s.time);

            times = Array.from(new Set(times));
            times.sort((a, b) => {
                const [hoursA, minutesA] = a.split(':').map(Number);
                const [hoursB, minutesB] = b.split(':').map(Number);
                return hoursA - hoursB || minutesA - minutesB;
            });

            return times;
        },
        isLoading(state): boolean {
            return state.isLoading;
        },
        error(state): string | null {
            return state.error;
        }
    },
    mutations: {
        setLines(state, lines: number[]) {
            state.lines = lines;
        },
        setStops(state, stops: StopInterface[]) {
            state.stops = stops;
        },
        setSelectedLineStops(state, stops: StopInterface[]) {
            state.selectedLineStops = stops;
        },
        setSelectedLineNumber(state, line: number | null) {
            state.selectedLineNumber = line;
        },
        setSelectedStop(state, stop: { name: string | null; order: number | null }) {
            state.selectedStop = stop;
        },
        setLoading(state, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        setError(state, error: string | null) {
            state.error = error;
        },
        resetSelection(state) {
            state.selectedLineNumber = null;
            state.selectedLineStops = [];
            state.selectedStop = { name: null, order: null };
        }
    },
    actions: {
        async loadLines({ commit, state }) {
            if (state.stops.length > 0) return;

            commit('setLoading', true);
            commit('setError', null);

            try {
                const response = await axios.get<StopInterface[]>('http://localhost:3000/stops');
                const stopsData = response.data;
                const lines = [...new Set(stopsData.map((stop) => stop.line))];
                commit('setLines', lines);
                commit('setStops', stopsData);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                commit('setError', 'Failed to load data. Please try again later.');
            } finally {
                commit('setLoading', false);
            }
        },
        loadStopsForLine({ commit, state }, line: number) {
            const stopsData = state.stops
                .filter((stop) => stop.line === line)
                .sort((a, b) => a.stop.localeCompare(b.stop));
            commit('setSelectedLineStops', stopsData);
        },
        selectLine({ commit, dispatch, state }, line: number) {
            if (state.selectedLineNumber === line) {
                commit('resetSelection');
            } else {
                commit('resetSelection');
                commit('setSelectedLineNumber', line);
                dispatch('loadStopsForLine', line);
            }
        },
        selectStop({ commit, state }, stopName: string) {
            const stop = state.selectedLineStops.find((s) => s.stop === stopName);
            if (stop) {
                commit('setSelectedStop', { name: stop.stop, order: stop.order });
            } else {
                commit('setSelectedStop', { name: null, order: null });
            }
        }
    }
});
