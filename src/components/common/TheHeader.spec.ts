import { mount, VueWrapper } from '@vue/test-utils';
import TheHeader from '@/components/common/TheHeader.vue';
import BaseHeading from '@/components/ui/BaseHeading.vue';
import MainContainer from '@/components/ui/MainContainer.vue';
import MainNavigation from '@/components/ui/MainNavigation.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
    { path: '/', name: 'LinesView', component: {} },
    { path: '/stops', name: 'StopsView', component: {} }
];
const router = createRouter({
    history: createMemoryHistory(),
    routes
});

describe('TheHeader.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof TheHeader>>;

    beforeEach(async () => {
        wrapper = mount(TheHeader, {
            props: {
                pageName: 'Test Page'
            },
            global: {
                plugins: [router],
                components: { BaseHeading, MainContainer, MainNavigation }
            }
        });

        await router.push('/');
        await router.isReady();
    });

    it('renders the header and all its child components', () => {
        expect(wrapper.find('header').exists()).toBe(true);
        expect(wrapper.findComponent(BaseHeading).exists()).toBe(true);
        expect(wrapper.find('h1').text()).toBe('Test Page');
        expect(wrapper.findComponent(MainNavigation).exists()).toBe(true);
    });

    it('passes navLinks to MainNavigation component', () => {
        const mainNavigation = wrapper.findComponent(MainNavigation);
        expect(mainNavigation.props('links')).toEqual([
            { name: 'LinesView', label: 'Bus Lines' },
            { name: 'StopsView', label: 'Stops' }
        ]);
    });
});
