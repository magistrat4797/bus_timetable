import { mount, VueWrapper } from '@vue/test-utils';
import LinesList from '@/components/LinesList.vue';
import { createStore, Store } from 'vuex';
import BaseCard from '@/components/ui/BaseCard.vue';
import { StateInterface } from '@/models/interfaces';

// Store mockup with sample data
const mockStore = {
    state: {
        selectedLineNumber: null,
        lines: [101, 110, 102]
    },
    getters: {
        sortedLines: () => [101, 102, 110]
    },
    actions: {
        selectLine: jest.fn()
    }
};

describe('LinesList.vue', () => {
    let store: Store<StateInterface>;
    let wrapper: VueWrapper<InstanceType<typeof LinesList>>;

    beforeEach(() => {
        store = createStore(mockStore) as Store<StateInterface>;

        wrapper = mount(LinesList, {
            global: {
                plugins: [store],
                components: { BaseCard }
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders BaseCard component', () => {
        expect(wrapper.findComponent(BaseCard).exists()).toBe(true);
    });

    it('renders all bus lines correctly', () => {
        const items = wrapper.findAll('.bus-lines-list__item');
        expect(items.length).toBe(3);
        expect(items[0].text()).toBe('101');
        expect(items[1].text()).toBe('102');
        expect(items[2].text()).toBe('110');
    });

    it('applies "active" class when line is selected', async () => {
        store.state.selectedLineNumber = 102;
        await wrapper.vm.$nextTick();

        const activeItem = wrapper.find('.bus-lines-list__item.active');
        expect(activeItem.exists()).toBe(true);
        expect(activeItem.text()).toBe('102');
    });

    it('calls "selectLine" action when a line is clicked', async () => {
        const lineItem = wrapper.findAll('.bus-lines-list__item')[2];
        await lineItem.trigger('click');

        expect(mockStore.actions.selectLine).toHaveBeenCalled();
        expect(mockStore.actions.selectLine).toHaveBeenCalledWith(
            expect.objectContaining({ state: expect.any(Object) }),
            110
        );
    });
});
