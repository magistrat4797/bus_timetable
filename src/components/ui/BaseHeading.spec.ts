import { mount, VueWrapper } from '@vue/test-utils';
import BaseHeading from '@/components/ui/BaseHeading.vue';

describe('BaseHeading.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof BaseHeading>>;

    it('renders default slot content', () => {
        wrapper = mount(BaseHeading, {
            slots: {
                default: '<h1 class="test-heading">Heading Content</h1>'
            }
        });
        expect(wrapper.find('.test-heading').exists()).toBe(true);
        expect(wrapper.find('.test-heading').text()).toBe('Heading Content');
    });
});
