import { mount, VueWrapper } from '@vue/test-utils';
import TimesList from '@/components/TimesList.vue';
import { useLists } from '@/composables/useLists';
import { createStore, Store } from 'vuex';
import { StateInterface, SelectedStopInterface } from '@/models/interfaces';

const { formatOrder } = useLists();

// Store mockup with sample data
const mockStore = {
    state: {
        selectedStop: { name: null, order: null, times: [] } as SelectedStopInterface
    },
    getters: {
        activeTimes: () => ['7:00', '8:00', '9:00', '10:00']
    }
};

describe('TimesList.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof TimesList>>;
    let store: Store<StateInterface>;

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(TimesList, {
            props: {
                times: store.getters.activeTimes,
                selectedStop: {
                    name: store.state.selectedStop.name ?? '',
                    order: store.state.selectedStop.order ?? 0
                }
            },
            global: {
                plugins: [store]
            }
        });
    });

    it('renders the bus stop name and formatted order when selectedStop is provided', async () => {
        store.state.selectedStop = { name: 'Kapelanka', order: 5, times: [] };
        await wrapper.setProps({
            selectedStop: {
                name: store.state.selectedStop.name ?? '',
                order: store.state.selectedStop.order ?? 0
            }
        });

        const stopDisplay = wrapper.find('.selected-stop');
        expect(stopDisplay.exists()).toBe(true);
        expect(stopDisplay.text()).toBe(
            `Bus Stop: ${store.state.selectedStop.name} ${formatOrder(store.state.selectedStop.order ?? 0)}`
        );
    });

    it('renders all times from activeTimes getter', () => {
        const timeItems = wrapper.findAll('.bus-list__item');
        expect(timeItems.length).toBe(store.getters.activeTimes.length);
        expect(timeItems[0].text()).toBe('7:00');
        expect(timeItems[1].text()).toBe('8:00');
        expect(timeItems[2].text()).toBe('9:00');
        expect(timeItems[3].text()).toBe('10:00');
    });

    it('renders empty stop display when selectedStop has default values', async () => {
        store.state.selectedStop = { name: null, order: null, times: [] };
        await wrapper.setProps({
            selectedStop: {
                name: store.state.selectedStop.name ?? '',
                order: store.state.selectedStop.order ?? 0
            }
        });

        const stopDisplay = wrapper.find('.selected-stop');
        expect(stopDisplay.exists()).toBe(false);
    });
});
