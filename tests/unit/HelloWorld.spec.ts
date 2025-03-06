import { test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import HelloWorld from '../../src/components/HelloWorld.vue';

test('renders HelloWorld and updates count', async () => {
  const { getByText } = render(HelloWorld, { props: { msg: 'Hello Test' } });

  expect(getByText('Hello Test')).toBeInTheDocument();

  const button = getByText(/count is 0/);
  expect(button).toBeInTheDocument();

  await fireEvent.click(button);
  expect(getByText(/count is 1/)).toBeInTheDocument();
});
