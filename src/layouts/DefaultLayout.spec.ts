import { mount, VueWrapper } from '@vue/test-utils';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TheHeader from '@/components/common/TheHeader.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore, Store } from 'vuex';
import { StateInterface } from '@/models/interfaces';
import { nextTick } from 'vue';

// Store mockup with sample data
const mockStore = {
    actions: {
        loadLines: jest.fn()
    },
    mutations: {
        resetSelection: jest.fn()
    }
};

const store = createStore(mockStore) as Store<StateInterface>;

const routes = [
    { path: '/', name: 'LinesView', component: { template: '<div>LinesView</div>' } },
    { path: '/stops', name: 'StopsView', component: { template: '<div>StopsView</div>' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

jest.spyOn(router, 'beforeEach');

describe('DefaultLayout.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof DefaultLayout>>;

    beforeEach(() => {
        wrapper = mount(DefaultLayout, {
            global: {
                plugins: [store, router],
                components: { TheHeader }
            }
        });
    });

    it('renders TheHeader component', () => {
        expect(wrapper.findComponent(TheHeader).exists()).toBe(true);
    });

    it('calls loadLines action on mounted', async () => {
        await nextTick();
        expect(mockStore.actions.loadLines).toHaveBeenCalled();
    });

    it('sets up a router beforeEach hook to call resetSelection', () => {
        expect(router.beforeEach).toHaveBeenCalled();
    });
});
