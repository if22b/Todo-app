import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Todo from '../src/components/Todo.vue';
import Checkmark from '../src/components/icons/Checkmark.vue';

describe('Todo.vue', () => {
  it('renders todo name correctly', () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    expect(wrapper.text()).toContain(todo.name);
  });

  it('applies "done" class when todo is done', async () => {
    const todo = { id: 1, name: 'Test Todo', done: true };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    const span = wrapper.find('span');
    expect(span.classes()).toContain('done');
  });

  it('toggles done state and emits correct event', async () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('done');
    expect(wrapper.emitted().done[0]).toEqual([todo.id]);

    // Update the prop to simulate state change
    await wrapper.setProps({ todo: { ...todo, done: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('undone');
    expect(wrapper.emitted().undone[0]).toEqual([todo.id]);
  });

  it('renders Checkmark component', () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    expect(wrapper.findComponent(Checkmark).exists()).toBe(true);
  });
});
