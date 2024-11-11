import { mount, VueWrapper } from '@vue/test-utils';
import TimesList from '@/components/TimesList.vue';
import { useLists } from '@/composables/useLists';

const { formatOrder } = useLists();

describe('TimesList.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof TimesList>>;

    const times = ['7:00', '8:00', '9:00', '10:00'];
    const selectedStop = { name: 'Kapelanka', order: 5 };

    beforeEach(() => {
        wrapper = mount(TimesList, {
            props: {
                times,
                selectedStop
            }
        });
    });

    it('renders the bus stop name and formatted order', () => {
        const stopDisplay = wrapper.find('.selected-stop');
        expect(stopDisplay.exists()).toBe(true);
        expect(stopDisplay.text()).toBe(
            `Bus Stop: ${selectedStop.name} ${formatOrder(selectedStop.order)}`
        );
    });

    it('renders all times passed as props', () => {
        const timeItems = wrapper.findAll('.bus-list__item');
        expect(timeItems.length).toBe(times.length);
        expect(timeItems[0].text()).toBe('7:00');
        expect(timeItems[1].text()).toBe('8:00');
        expect(timeItems[2].text()).toBe('9:00');
        expect(timeItems[3].text()).toBe('10:00');
    });

    it('renders empty stop display when selectedStop is null', async () => {
        await wrapper.setProps({ selectedStop: null });
        const stopDisplay = wrapper.find('.selected-stop');

        expect(stopDisplay.exists()).toBe(false);
    });
});
