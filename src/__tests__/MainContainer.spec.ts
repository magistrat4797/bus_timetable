import { mount } from '@vue/test-utils';
import MainContainer from '@/components/ui/MainContainer.vue';

describe('MainContainer.vue', () => {
    it('renders slot content', () => {
        const wrapper = mount(MainContainer, {
            slots: {
                default: '<div class="test-container-content">Test container content</div>'
            }
        });
        expect(wrapper.find('.test-container-content').exists()).toBe(true);
        expect(wrapper.find('.test-container-content').text()).toBe('Test container content');
    });
});
