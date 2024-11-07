import { computed } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '@/models/interfaces';

export function useBusStore() {
    const store = useStore<StateInterface>();

    // Getters
    const allLines = computed(() => store.getters.allLines);
    const selectedLineNumber = computed(() => store.state.selectedLineNumber);
    const activeStops = computed(() => store.getters.activeStops);
    const selectedStopName = computed(() => store.state.selectedStopName);
    const activeTimes = computed(() => store.getters.activeTimes);
    const isLoading = computed(() => store.state.isLoading);

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
        selectedLineNumber,
        activeStops,
        selectedStopName,
        activeTimes,
        isLoading,
        loadLines,
        selectLine,
        selectStop
    };
}
