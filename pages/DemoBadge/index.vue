<script>
import {
  defineComponent,
} from 'vue'

import Badge from '~/components/Badge.vue'

export default defineComponent({
  name: 'DemoBadge',

  components: {
    Badge,
  },
})
</script>

<template>
  <div class="demo-badge">
    <h1>Badge Demo</h1>

    <!-- Standard badges with colors -->
    <section>
      <h2>Standard</h2>
      <Badge
        content="5"
        variant="standard"
        color="primary"
      >
        <button>Inbox</button>
      </Badge>
      <Badge
        content="99"
        variant="standard"
        color="secondary"
      >
        <button>Messages</button>
      </Badge>
      <Badge
        content="120"
        variant="standard"
        color="success"
        :max="99"
      >
        <button>Tasks</button>
      </Badge>
      <Badge
        content="7"
        variant="standard"
        color="danger"
      >
        <button>Alerts</button>
      </Badge>
      <Badge
        content="0"
        variant="standard"
        color="warning"
        :showZero="true"
      >
        <button>Drafts</button>
      </Badge>
    </section>

    <!-- Dot badges -->
    <section>
      <h2>Dot</h2>
      <Badge
        variant="dot"
        color="primary"
      >
        <button>Notification</button>
      </Badge>
      <Badge
        variant="dot"
        color="success"
      >
        <button>Status</button>
      </Badge>
      <Badge
        variant="dot"
        color="danger"
      >
        <button>Error</button>
      </Badge>
      <Badge
        variant="dot"
        color="warning"
      >
        <button>Pending</button>
      </Badge>
      <Badge
        variant="dot"
        color="secondary"
      >
        <button>Do not use</button>
      </Badge>
    </section>

    <!-- Color badges -->
    <section>
      <h2>Colors</h2>
      <Badge
        variant="dot"
        color="primary"
      >
        <button>Primary</button>
      </Badge>
      <Badge
        variant="dot"
        color="success"
      >
        <button>Success</button>
      </Badge>
      <Badge
        variant="dot"
        color="danger"
      >
        <button>Danger</button>
      </Badge>
      <Badge
        variant="dot"
        color="warning"
      >
        <button>Warning</button>
      </Badge>
      <Badge
        variant="dot"
        color="secondary"
      >
        <button>Secondary</button>
      </Badge>
    </section>

    <!-- Anchor badges -->
    <section>
      <h2>Anchor Origin</h2>
      <Badge
        :anchorOrigin="{ vertical: 'top', horizontal: 'left' }"
        variant="dot"
        color="primary"
      >
        <button>top left</button>
      </Badge>
      <Badge
        :anchorOrigin="{ vertical: 'bottom', horizontal: 'left' }"
        variant="dot"
        color="success"
      >
        <button>bottom left</button>
      </Badge>
      <Badge
        :anchorOrigin="{ vertical: 'top', horizontal: 'right' }"
        variant="dot"
        color="danger"
      >
        <button>top right</button>
      </Badge>
      <Badge
        :anchorOrigin="{ vertical: 'bottom', horizontal: 'right' }"
        variant="dot"
        color="warning"
      >
        <button>bottom right</button>
      </Badge>
    </section>

    <!-- Overlap circular -->
    <section>
      <h2>Overlap circular</h2>
      <Badge
        content="5"
        variant="standard"
        color="primary"
        overlap="circular"
      >
        <button>Inbox</button>
      </Badge>
      <Badge
        content="99"
        variant="standard"
        color="secondary"
      >
        <button>Messages</button>
      </Badge>
      <Badge
        content="120"
        variant="standard"
        color="success"
        :max="99"
        overlap="circular"
      >
        <button>Tasks</button>
      </Badge>
      <Badge
        content="7"
        variant="standard"
        color="danger"
        overlap="circular"
      >
        <button>Alerts</button>
      </Badge>
      <Badge
        content="0"
        variant="standard"
        color="warning"
        :showZero="true"
        overlap="circular"
      >
        <button>Drafts</button>
      </Badge>
      <Badge
        content="5"
        color="primary"
        overlap="circular"
      >
        <img
          src="https://i.pravatar.cc/100"
          alt="User avatar"
          class="avatar"
        >
      </Badge>
    </section>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.demo-badge section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>
