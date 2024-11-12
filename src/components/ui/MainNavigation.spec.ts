import { mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { nextTick } from 'vue';
import MainNavigation from '@/components/ui/MainNavigation.vue';

const routes = [
    { path: '/', name: 'LinesView', component: {} },
    { path: '/stops', name: 'StopsView', component: {} }
];
const router = createRouter({
    history: createMemoryHistory(),
    routes
});

describe('MainNavigation.vue', () => {
    const links = [
        { name: 'LinesView', label: 'Bus Lines' },
        { name: 'StopsView', label: 'Stops' }
    ];

    let wrapper: VueWrapper<InstanceType<typeof MainNavigation>>;

    beforeEach(async () => {
        jest.useFakeTimers();

        wrapper = mount(MainNavigation, {
            props: { links },
            global: {
                plugins: [router]
            }
        });

        await router.push('/');
        await router.isReady();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders all navigation links', () => {
        const navLinks = wrapper.findAll('.nav-link');
        expect(navLinks.length).toBe(2);
        expect(navLinks[0].text()).toBe('Bus Lines');
        expect(navLinks[1].text()).toBe('Stops');
    });

    it('sets the active class on the current route', () => {
        const activeLink = wrapper.find('.nav-link.active');
        expect(activeLink.exists()).toBe(true);
        expect(activeLink.text()).toBe('Bus Lines');
    });

    it('sets the correct styles on the nav-indicator', async () => {
        const firstLink = wrapper.findAll('.nav-link')[0];
        await firstLink.trigger('click');

        const navIndicator = wrapper.find('.nav-indicator');
        expect(navIndicator.exists()).toBe(true);
        expect(navIndicator.attributes('style')).toContain('width');
        expect(navIndicator.attributes('style')).toContain('transform');
        expect(navIndicator.attributes('style')).toContain('opacity: 1');
    });

    it('applies the correct animation classes to the nav-indicator', async () => {
        jest.advanceTimersByTime(100);

        await nextTick();

        const navIndicator = wrapper.find('.nav-indicator');
        expect(navIndicator.classes()).toContain('transition-all');
        expect(navIndicator.classes()).toContain('duration-300');
        expect(navIndicator.classes()).toContain('ease-in-out');
    });

    it('sets the width of the nav-indicator equal to the active link', async () => {
        const firstLink = wrapper.findAll('.nav-link')[0];
        await firstLink.trigger('click');

        const activeLinkWidth = firstLink.element.getBoundingClientRect().width;
        const navIndicator = wrapper.find('.nav-indicator');
        const indicatorStyle = navIndicator.attributes('style');
        const widthMatch = indicatorStyle?.match(/width:\s*(\d+(\.\d+)?px)/);
        const indicatorWidth = widthMatch ? parseFloat(widthMatch[1]) : 0;

        expect(indicatorWidth).toBeCloseTo(activeLinkWidth, 1);
    });
});
