import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-compact border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-rowBorder bg-rowActive text-ink hover:bg-ink/18',
        secondary: 'border-line bg-row text-ink hover:bg-panel',
        outline: 'border-line bg-page text-ink hover:bg-row',
        ghost: 'border-transparent bg-transparent text-muted hover:bg-row hover:text-ink',
        link: 'border-transparent bg-transparent text-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-3 text-[13px]',
        sm: 'h-8 px-2.5 text-xs',
        lg: 'h-10 px-4 text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
  },
);
