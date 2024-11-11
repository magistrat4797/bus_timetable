import { mount, VueWrapper } from '@vue/test-utils';
import BaseCard from '@/components/ui/BaseCard.vue';

describe('BaseCard.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof BaseCard>>;

    beforeEach(() => {
        wrapper = mount(BaseCard, {
            slots: {}
        });
    });

    it('renders default slot content', () => {
        wrapper = mount(BaseCard, {
            slots: { default: '<div class="test-card-content">Test card content</div>' }
        });
        expect(wrapper.find('.test-card-content').exists()).toBe(true);
        expect(wrapper.find('.test-card-content').text()).toBe('Test card content');
    });

    it('renders label slot when provided', () => {
        wrapper = mount(BaseCard, {
            slots: { label: '<span class="test-card-label">Test card label</span>' }
        });
        expect(wrapper.find('.card__label').exists()).toBe(true);
        expect(wrapper.find('.test-card-label').text()).toBe('Test card label');
    });
});
