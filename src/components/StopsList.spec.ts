import { mount, VueWrapper } from '@vue/test-utils';
import StopsList from '@/components/StopsList.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { createStore, Store } from 'vuex';
import { StateInterface } from '@/models/interfaces';
import { StopType } from '@/models/types';
import { nextTick } from 'vue';
import { useLists } from '@/composables/useLists';

// Store mockup with sample data
const mockStore = {
    state: {
        selectedLineNumber: 101
    },
    actions: {
        selectStop: jest.fn()
    }
};

const { formatOrder } = useLists();

describe('StopsList.vue', () => {
    let store: Store<StateInterface>;
    let wrapper: VueWrapper<InstanceType<typeof StopsList>>;

    const stops: StopType[] = [
        { stop: 'Rodzinna', order: 9 },
        { stop: 'Kapelanka', order: 5 },
        { stop: 'Malczewskiego', order: 7 },
        { stop: 'Szwedzka', order: 4 }
    ];

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(StopsList, {
            props: {
                stops,
                showLineNumber: true,
                selectedLineNumber: 101,
                clickable: true,
                showSearch: true
            },
            global: {
                plugins: [store],
                components: { BaseInput }
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the list of stops in default ascending order by name', () => {
        const items = wrapper.findAll('.bus-list__item');
        expect(items.length).toBe(4);
        expect(items[0].text()).toBe(`Kapelanka ${formatOrder(5)}`);
        expect(items[1].text()).toBe(`Malczewskiego ${formatOrder(7)}`);
        expect(items[2].text()).toBe(`Rodzinna ${formatOrder(9)}`);
        expect(items[3].text()).toBe(`Szwedzka ${formatOrder(4)}`);
    });

    it('sorts stops by order when sort button is clicked', async () => {
        const sortButton = wrapper.find('.sort-btn');
        await sortButton.trigger('click');
        await nextTick();

        const items = wrapper.findAll('.bus-list__item');
        expect(items[0].text()).toBe(`Szwedzka ${formatOrder(4)}`);
        expect(items[1].text()).toBe(`Kapelanka ${formatOrder(5)}`);
        expect(items[2].text()).toBe(`Malczewskiego ${formatOrder(7)}`);
        expect(items[3].text()).toBe(`Rodzinna ${formatOrder(9)}`);
    });

    it('renders the search input when showSearch is true', () => {
        expect(wrapper.findComponent(BaseInput).exists()).toBe(true);
        expect(wrapper.find('.search-input').exists()).toBe(true);
    });

    it('filters stops based on search query', async () => {
        const searchInput = wrapper.find('.search-input input');
        await searchInput.setValue('Kapelanka');
        await nextTick();

        const items = wrapper.findAll('.bus-list__item');
        expect(items.length).toBe(1);
        expect(items[0].text()).toBe(`Kapelanka ${formatOrder(5)}`);
    });

    it('emits "selectStop" action when a stop is clicked', async () => {
        const stopItem = wrapper
            .findAll('.bus-list__item')
            .find((item) => item.text().includes('Kapelanka'));
        if (stopItem) {
            await stopItem.trigger('click');
        }

        expect(mockStore.actions.selectStop).toHaveBeenCalled();
        expect(mockStore.actions.selectStop).toHaveBeenCalledWith(
            expect.objectContaining({ state: expect.any(Object) }),
            'Kapelanka'
        );
    });

    it('shows "No stops found" message when filteredStops is empty', async () => {
        const searchInput = wrapper.find('.search-input input');
        await searchInput.setValue('Nonexistent Stop');
        await nextTick();

        expect(wrapper.find('.no-results').exists()).toBe(true);
        expect(wrapper.find('.no-results').text()).toBe('No stops found for the given search.');
    });

    it('displays correct tooltip text on sort button', async () => {
        const sortButton = wrapper.find('.sort-btn');
        expect(sortButton.attributes('data-tooltip-text')).toBe('Sort by order');

        await sortButton.trigger('click');
        await nextTick();

        expect(sortButton.attributes('data-tooltip-text')).toBe('Sort by name');
    });

    it('applies "active" class to the active stop', async () => {
        store.state.selectedStop = { name: 'Kapelanka', order: 5, times: [] };
        await nextTick();

        const activeItem = wrapper.find('.bus-list__item.active');
        expect(activeItem.exists()).toBe(true);
        expect(activeItem.text()).toBe(`Kapelanka ${formatOrder(5)}`);
    });

    it('renders the selected line number when showLineNumber is true', () => {
        const selectedLineLabel = wrapper.find('.selected-line');
        expect(selectedLineLabel.exists()).toBe(true);
        expect(selectedLineLabel.text()).toBe('Bus Line: 101');
    });
});
