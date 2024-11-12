import { mount } from '@vue/test-utils';
import TheLoader from '@/components/ui/TheLoader.vue';

describe('TheLoader.vue', () => {
    it('renders the loader div', () => {
        const wrapper = mount(TheLoader);
        const loader = wrapper.find('.loader');
        expect(loader.exists()).toBe(true);
    });
});
