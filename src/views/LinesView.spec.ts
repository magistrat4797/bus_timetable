import { mount, VueWrapper } from '@vue/test-utils';
import LinesView from '@/views/LinesView.vue';
import MainContainer from '@/components/ui/MainContainer.vue';
import ThePlaceholder from '@/components/ThePlaceholder.vue';
import TheLoader from '@/components/ui/TheLoader.vue';
import LinesList from '@/components/LinesList.vue';
import { createStore, Store } from 'vuex';
import { StateInterface } from '@/models/interfaces';
import { nextTick } from 'vue';

// Store mockup with sample data
const mockStore = {
    state: {
        lines: [],
        stops: [],
        selectedLineStops: [],
        selectedLineNumber: null,
        selectedStop: { name: null, order: null, times: [] },
        isLoading: false,
        error: null
    },
    getters: {
        activeStops: () => [
            { stop: 'Rodzinna', order: 9, line: 101 },
            { stop: 'Kapelanka', order: 5, line: 101 },
            { stop: 'Malczewskiego', order: 7, line: 101 },
            { stop: 'Szwedzka', order: 4, line: 101 }
        ],
        activeTimes: () => ['7:00', '8:00', '9:00', '10:00'],
        isLoading: () => false,
        error: () => null
    },
    actions: {}
};

describe('LinesView.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof LinesView>>;
    let store: Store<StateInterface>;

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(LinesView, {
            global: {
                plugins: [store],
                components: { MainContainer, ThePlaceholder, TheLoader, LinesList }
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
        store.state.error = 'Failed to load data. Please try again later.';
        await nextTick();

        const errorMessage = wrapper.find('.error-message');
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toBe('Failed to load data. Please try again later.');
    });

    it('renders LinesList and ThePlaceholder when not loading or error', async () => {
        store.state.isLoading = false;
        store.state.error = null;
        await nextTick();

        expect(wrapper.findComponent(LinesList).exists()).toBe(true);
        expect(wrapper.findAllComponents(ThePlaceholder).length).toBe(2);
    });
});
