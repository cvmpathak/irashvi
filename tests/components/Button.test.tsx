import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders its label and responds to clicks', async () => {
    let clicked = 0;
    render(<Button onClick={() => (clicked += 1)}>Click me</Button>);
    await userEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(clicked).toBe(1);
  });

  it('does not fire onClick when disabled', async () => {
    let clicked = 0;
    render(
      <Button disabled onClick={() => (clicked += 1)}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole('button', { name: /disabled/i }));
    expect(clicked).toBe(0);
  });
});