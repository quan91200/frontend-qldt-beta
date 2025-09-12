<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import NuxtLayout from '#app/components/nuxt-layout.js'

import ErrorContext from './app/contexts/ErrorContext'

import Button from '~/components/Button.vue'

export default defineComponent({
  components: {
    NuxtLayout,
    Icon,
    NuxtLink,
    Button,
  },

  props: {
    error: {
      /**
       * @type {import('vue').PropType<{
       *   statusCode: number
       *   message: string
       * }>}
       */
      type: Object,
      default: () => ({}),
    },
  },

  setup(
    props,
    componentContext,
  ) {
    const context = ErrorContext.create({
      props,
      componentContext,
    })
      .setupComponent()

    return {
      context,
    }
  }
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="unit-error">
      <div class="section">
        <img
          src="/error.webp"
          alt="error"
          class="error"
        >

        <div class="content">
          <h3 class="title">
            {{ context.generateError() }}
          </h3>

          <p class="text">
            {{ context.getErrorMessage }}
          </p>

          <NuxtLink to="/">
            <Button variant="outline-secondary">
              <Icon
                name="ph:arrow-u-up-left"
                size="1rem"
              />

              <span>Return to home page</span>
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.unit-error {
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: var(--size-space-medium);

  text-align: center;
}

.unit-error > .section {
  width: 100%;
  height: 100%;

  border-radius: var(--size-border-radius-large);

  padding-block: var(--size-space-large);
  padding-inline: var(--size-space-large);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: var(--size-space-large);

  background-color: var(--color-gray-50);
}

.unit-error > .section > .error {
  --error-img-width: 16rem;

  width: var(--error-img-width);
}

.unit-error > .section > .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: var(--size-space-medium);
}

.unit-error > .section > .content > .title {
  font-size: var(--font-size-heading-large);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
}

.unit-error > .section > .content > .text {
  color: var(--color-gray-700);
}
</style>
