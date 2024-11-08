import { createStore } from 'vuex';
import axios from 'axios';
import { StateInterface, StopInterface } from '@/models/interfaces';

export default createStore<StateInterface>({
    state: {
        lines: [],
        stops: [],
        selectedLineStops: [],
        selectedLineNumber: null,
        selectedStopName: null,
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
            if (!state.selectedStopName) return [];

            let times = state.selectedLineStops
                .filter((s) => s.stop === state.selectedStopName)
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
        setSelectedStopName(state, stop: string | null) {
            state.selectedStopName = stop;
        },
        setLoading(state, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        setError(state, error: string | null) {
            state.error = error;
        },
        resetSelection(state) {
            state.selectedStopName = null;
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
                commit('setSelectedLineNumber', null);
                commit('setSelectedLineStops', []);
                commit('resetSelection');
            } else {
                commit('setSelectedLineNumber', line);
                commit('resetSelection');
                dispatch('loadStopsForLine', line);
            }
        },
        selectStop({ commit, state }, stop: string) {
            if (state.selectedStopName === stop) {
                commit('setSelectedStopName', null);
            } else {
                commit('setSelectedStopName', stop);
            }
        }
    }
});
