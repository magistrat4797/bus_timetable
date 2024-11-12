import { computed } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/models/interfaces';

export function useMainStore() {
    const store = useStore<StateInterface>();

    // States
    const selectedLineNumber = computed(() => store.state.selectedLineNumber);
    const selectedStop = computed(() => store.state.selectedStop);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);

    // Getters
    const sortedLines = computed(() => store.getters.sortedLines);
    const allStops = computed(() => store.state.stops);
    const activeStops = computed(() => store.getters.activeStops);
    const activeTimes = computed(() => store.getters.activeTimes);

    // Actions
    const loadLines = () => {
        store.dispatch('loadLines');
    };

    const selectLine = (line: number) => {
        store.dispatch('selectLine', line);
    };

    const selectStop = (stop: string | null) => {
        store.dispatch('selectStop', stop);
    };

    const resetSelection = () => {
        store.commit('resetSelection');
    };

    return {
        sortedLines,
        allStops,
        selectedLineNumber,
        selectedStop,
        activeStops,
        activeTimes,
        isLoading,
        error,
        loadLines,
        selectLine,
        selectStop,
        resetSelection
    };
}
