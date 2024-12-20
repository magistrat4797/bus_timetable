import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils';
import ThePlaceholder from '@/components/ThePlaceholder.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import StopsList from '@/components/StopsList.vue';
import TimesList from '@/components/TimesList.vue';
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
        selectedStop: { name: null, order: null, times: [] }
    },
    getters: {
        activeStops: () => [
            { stop: 'Rodzinna', order: 9, line: 101 },
            { stop: 'Kapelanka', order: 5, line: 101 },
            { stop: 'Malczewskiego', order: 7, line: 101 },
            { stop: 'Szwedzka', order: 4, line: 101 }
        ],
        activeTimes: () => ['7:00', '8:00', '9:00', '10:00']
    }
};

describe('ThePlaceholder.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof ThePlaceholder>>;
    let store: Store<StateInterface>;

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(ThePlaceholder, {
            props: {
                type: 'times'
            },
            global: {
                plugins: [store],
                components: { BaseCard, StopsList, TimesList }
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders "Please select the bus line first" label when no line is selected', async () => {
        store.state.selectedLineNumber = null;
        await nextTick();

        const label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Please select the bus line first');
    });

    it('renders StopsList when type="stops" and line is selected', async () => {
        store.state.selectedLineNumber = 101;
        await wrapper.setProps({ type: 'stops' });

        await nextTick();

        const stopsList = wrapper.findComponent(StopsList);
        expect(stopsList.exists()).toBe(true);
        expect(stopsList.props('stops')).toEqual(mockStore.getters.activeStops());
    });

    it('renders "Please select the bus stop first" label when type="times" and no stop is selected', async () => {
        store.state.selectedLineNumber = 101;
        await wrapper.setProps({ type: 'times' });

        await nextTick();

        const label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Please select the bus stop first');
    });

    it('renders TimesList when type="times" and stop is selected', async () => {
        store.state.selectedLineNumber = 101;
        store.state.selectedStop = {
            name: 'Kapelanka',
            order: 5,
            times: ['9:00', '8:00', '7:00', '10:00']
        };
        await wrapper.setProps({ type: 'times' });

        await nextTick();

        const timesList = wrapper.findComponent(TimesList);
        expect(timesList.exists()).toBe(true);
        expect(timesList.props('times')).toEqual(mockStore.getters.activeTimes());
    });

    it('renders correct label for different conditions', async () => {
        let label: DOMWrapper<Element>;

        // Case 1: No line selected (for type 'times')
        store.state.selectedLineNumber = null;
        store.state.selectedStop = { name: null, order: null, times: [] };
        await wrapper.setProps({ type: 'times' });
        await nextTick();

        label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Please select the bus line first');

        // Case 2: Line selected, stop not selected (for type 'times')
        store.state.selectedLineNumber = 101;
        store.state.selectedStop = { name: null, order: null, times: [] };
        await wrapper.setProps({ type: 'times' });
        await nextTick();

        label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Please select the bus stop first');

        // Case 3: Line and stop selected (for type 'times')
        store.state.selectedLineNumber = 101;
        store.state.selectedStop = {
            name: 'Kapelanka',
            order: 5,
            times: ['9:00', '8:00', '7:00', '10:00']
        };
        await wrapper.setProps({ type: 'times' });
        await nextTick();

        label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(false);

        // Case 4: 'stops' type with line selected
        store.state.selectedLineNumber = 101;
        await wrapper.setProps({ type: 'stops' });
        await nextTick();

        label = wrapper.find('.placeholder__label');
        expect(label.exists()).toBe(false);

        // Case 5: Line not selected (for both types)
        const mockStore = {
            state: {
                selectedLineNumber: null
            },
            getters: {
                // Set empty activeStops array for testing
                activeStops: () => []
            }
        };
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(ThePlaceholder, {
            props: {
                type: 'stops'
            },
            global: {
                plugins: [store],
                components: { BaseCard, StopsList, TimesList }
            }
        });
        await nextTick();

        label = wrapper.find('.placeholder__label');

        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Please select the bus line first');
    });

    it('displays times in ascending order by default for type="times"', async () => {
        store.state.selectedLineNumber = 101;
        store.state.selectedStop = {
            name: 'Kapelanka',
            order: 5,
            times: ['9:00', '8:00', '10:00', '7:00']
        };
        store.state.selectedLineStops = [
            { stop: 'Kapelanka', order: 5, time: '9:00', line: 101 },
            { stop: 'Kapelanka', order: 5, time: '8:00', line: 101 },
            { stop: 'Kapelanka', order: 5, time: '10:00', line: 101 },
            { stop: 'Kapelanka', order: 5, time: '7:00', line: 101 }
        ];
        await wrapper.setProps({ type: 'times' });

        await nextTick();

        const timesList = wrapper.findComponent(TimesList);
        const timeItems = timesList.findAll('.bus-list__item');
        expect(timeItems[0].text()).toBe('7:00');
        expect(timeItems[1].text()).toBe('8:00');
        expect(timeItems[2].text()).toBe('9:00');
        expect(timeItems[3].text()).toBe('10:00');
    });
});
