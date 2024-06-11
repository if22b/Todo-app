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

  it('Checkmark component has done prop set correctly', () => {
    const todo = { id: 1, name: 'Test Todo', done: true };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    const checkmark = wrapper.findComponent(Checkmark);
    expect(checkmark.props().done).toBe(true);
  });

  it('does not apply "done" class when todo is not done', () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    const span = wrapper.find('span');
    expect(span.classes()).not.toContain('done');
  });

  it('Checkmark component changes based on done state', async () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    let checkmark = wrapper.findComponent(Checkmark);
    expect(checkmark.props().done).toBe(false);

    await wrapper.setProps({ todo: { ...todo, done: true } });
    checkmark = wrapper.findComponent(Checkmark);
    expect(checkmark.props().done).toBe(true);
  });

  it('emits done event when todo item is clicked', async () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted().done).toBeTruthy();
  });

  it('applies correct CSS classes based on "done" state', () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    let span = wrapper.find('span');
    expect(span.classes()).not.toContain('done');

    wrapper.setProps({ todo: { ...todo, done: true } });
    span = wrapper.find('span');
    expect(span.classes()).toContain('done');
  });

  it('renders correctly with a very long name', () => {
    const longName = 'a'.repeat(1000);
    const todo = { id: 1, name: longName, done: false };
    const wrapper = mount(Todo, {
      props: { todo }
    });
    expect(wrapper.text()).toContain(longName);
  });

  it('calls method on click', async () => {
    const todo = { id: 1, name: 'Test Todo', done: false };
    const mockMethod = vi.fn();
    const wrapper = mount(Todo, {
      props: { todo },
      methods: {
        toggleDone: mockMethod
      }
    });
    await wrapper.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });
  
});
