<script>
import {
  defineComponent,
} from "vue"

import Button from "~/components/Button.vue"

export default defineComponent({
  name: "DemoButton",

  components: {
    Button,
  },
})
</script>

<template>
  <div class="unit-container">
    <h1>
      Button Component Demo
    </h1>

    <!-- Variant Buttons -->
    <section class="unit-content">
      <h2>
        Solid Variant
      </h2>
      <div class="unit-button">
        <Button
          variant="primary"
        >
          Primary
        </Button>
        <Button
          variant="secondary"
        >
          Secondary
        </Button>
        <Button
          variant="success"
        >
          Success
        </Button>
        <Button
          variant="danger"
        >
          Danger
        </Button>
        <Button
          variant="warning"
        >
          Warning
        </Button>
      </div>
    </section>

    <!-- Outline Buttons -->
    <section class="unit-content">
      <h2>
        Outline Variant
      </h2>
      <div class="unit-button">
        <Button
          variant="outline-primary"
        >
          Primary
        </Button>
        <Button
          variant="outline-secondary"
        >
          Secondary
        </Button>
        <Button
          variant="outline-success"
        >
          Success
        </Button>
        <Button
          variant="outline-danger"
        >
          Danger
        </Button>
        <Button
          variant="outline-warning"
        >
          Warning
        </Button>
      </div>
    </section>

    <!-- Disabled -->
    <section class="unit-content">
      <h2>
        Disabled
      </h2>
      <div class="unit-button">
        <Button
          variant="outline-primary"
          disabled
        >
          Primary
        </Button>
        <Button
          variant="outline-secondary"
          disabled
        >
          Secondary
        </Button>
        <Button
          variant="outline-success"
          disabled
        >
          Success
        </Button>
        <Button
          variant="outline-danger"
          disabled
        >
          Danger
        </Button>
        <Button
          variant="outline-warning"
          disabled
        >
          Warning
        </Button>
      </div>
    </section>

    <!-- Loading -->
    <section class="unit-content">
      <h2>
        Loading
      </h2>
      <div class="unit-button">
        <Button
          variant="outline-primary"
          :loading="true"
        >
          Primary
        </Button>
        <Button
          variant="outline-secondary"
          :loading="true"
        >
          Secondary
        </Button>
        <Button
          variant="outline-success"
          :loading="true"
        >
          Success
        </Button>
        <Button
          variant="outline-danger"
          :loading="true"
        >
          Danger
        </Button>
        <Button
          variant="outline-warning"
          :loading="true"
        >
          Warning
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.unit-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--size-space-medium);

  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-medium);
}

.unit-container > .unit-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--size-space-medium);
}

.unit-container > .unit-content > .unit-button {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);
}
</style>
