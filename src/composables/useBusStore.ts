import { computed } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/models/interfaces';

export function useBusStore() {
    const store = useStore<StateInterface>();

    // States
    const selectedLineNumber = computed(() => store.state.selectedLineNumber);
    const selectedStopName = computed(() => store.state.selectedStopName);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);

    // Getters
    const allLines = computed(() => store.getters.allLines);
    const allStops = computed(() => store.state.stops); // <-- Dodano allStops
    const activeStops = computed(() => store.getters.activeStops);
    const activeTimes = computed(() => store.getters.activeTimes);

    // Actions
    const loadLines = () => {
        store.dispatch('loadLines');
    };

    const selectLine = (line: number) => {
        store.dispatch('selectLine', line);
    };

    const selectStop = (stop: string) => {
        store.dispatch('selectStop', stop);
    };

    return {
        allLines,
        allStops,
        selectedLineNumber,
        activeStops,
        selectedStopName,
        activeTimes,
        isLoading,
        error,
        loadLines,
        selectLine,
        selectStop
    };
}
