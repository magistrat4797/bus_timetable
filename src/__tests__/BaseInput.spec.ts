import { mount, VueWrapper } from '@vue/test-utils';
import BaseInput from '@/components/ui/BaseInput.vue';

describe('BaseInput.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof BaseInput>>;

    beforeEach(() => {
        wrapper = mount(BaseInput, {
            props: { modelValue: '' }
        });
    });

    it('renders with correct type', async () => {
        await wrapper.setProps({ type: 'password' });
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe('password');
    });

    it('defaults to type "text" if type is not provided', () => {
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe('text');
    });

    it('emits update:modelValue when input value changes', async () => {
        const input = wrapper.find('input');
        await input.setValue('New Value');

        const emittedEvents = wrapper.emitted('update:modelValue');
        expect(emittedEvents).toBeTruthy();
        if (emittedEvents) {
            expect(emittedEvents[0]).toEqual(['New Value']);
        }
    });

    it('shows placeholder when provided', async () => {
        await wrapper.setProps({ placeholder: 'Enter your name' });
        expect(wrapper.find('.label').text()).toBe('Enter your name');
    });

    it('focuses and blurs correctly, updating classes', async () => {
        const input = wrapper.find('input');

        await input.trigger('focus');
        expect(wrapper.find('.form-group').classes()).toContain('focused');

        await input.trigger('blur');
        expect(wrapper.find('.form-group').classes()).not.toContain('focused');
    });

    it('renders icon when provided', async () => {
        await wrapper.setProps({ icon: '<svg></svg>' });
        expect(wrapper.find('.input-icon').exists()).toBe(true);
    });
});
