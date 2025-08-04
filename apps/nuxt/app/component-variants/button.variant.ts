import { defineComponentVariant } from '@wisemen/vue-core-components'

defineComponentVariant({
  config: {
    root: 'rounded-full',
  },
  target: {
    prop: 'variant',
    value: 'primary',
  },
  component: 'button',
})

defineComponentVariant({
  config: {
    root: `bg-black rounded-full border-transparent text-white 
    shadow-none data-[loading=false]:not-disabled:hover:bg-black/80`,
  },
  target: {
    prop: 'variant',
    value: 'secondary',
  },
  component: 'button',
})
