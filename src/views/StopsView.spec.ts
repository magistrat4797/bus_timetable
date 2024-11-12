import { mount, VueWrapper } from '@vue/test-utils';
import StopsView from '@/views/StopsView.vue';
import MainContainer from '@/components/ui/MainContainer.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import StopsList from '@/components/StopsList.vue';
import TheLoader from '@/components/ui/TheLoader.vue';
import { createStore, Store } from 'vuex';
import { StateInterface, StopInterface } from '@/models/interfaces';
import { nextTick } from 'vue';

// Store mockup with sample data
const mockStore = {
    state: {
        lines: [101, 110, 102],
        stops: [
            { stop: 'Rodzinna', line: 101, order: 1, time: '10:00' },
            { stop: 'Kapelanka', line: 101, order: 2, time: '11:00' },
            { stop: 'Rodzinna', line: 102, order: 1, time: '12:00' }
        ],
        selectedLineStops: [],
        selectedLineNumber: 101,
        selectedStop: { name: null, order: null, times: [] }
    },
    getters: {
        sortedLines: () => [101, 102, 110]
    },
    actions: {}
};

describe('StopsView.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof StopsView>>;
    let store: Store<StateInterface>;

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(StopsView, {
            global: {
                plugins: [store],
                components: { MainContainer, BaseCard, StopsList, TheLoader }
            }
        });
    });

    it('renders loader when isLoading is true', async () => {
        store.state.isLoading = true;
        await nextTick();

        const loader = wrapper.findComponent(TheLoader);
        expect(loader.exists()).toBe(true);
    });

    it('renders error message when error is not null', async () => {
        store.state.error = 'An error occurred';
        await nextTick();

        const errorMessage = wrapper.find('.error-message');
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toBe('An error occurred');
    });

    it('renders StopsList inside BaseCard when not loading or error', async () => {
        store.state.isLoading = false;
        store.state.error = null;
        await nextTick();

        const baseCard = wrapper.findComponent(BaseCard);
        expect(baseCard.exists()).toBe(true);

        const stopsList = baseCard.findComponent(StopsList);
        expect(stopsList.exists()).toBe(true);
    });

    it('filters unique stops correctly', async () => {
        store.state.selectedLineNumber = 101;
        await nextTick();

        const stopsList = wrapper.findComponent(StopsList);
        expect(stopsList.exists()).toBe(true);

        const uniqueStops = stopsList.props('stops') as StopInterface[];
        expect(uniqueStops.length).toBe(2);
    });
});
