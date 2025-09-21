<script>
import {
  ref,
  defineComponent,
} from 'vue'

import UserContext from '~/app/contexts/api/UsersContext.js'

export default defineComponent({
  setup() {
    const context = UserContext.create({
      props: {},
    })
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="users-container">
    <h2 class="title">
      Danh sách người dùng
    </h2>
    <ul class="users-list">
      <li
        class="user-card"
        v-for="user in context.users"
        :key="user.id"
      >
        <div class="user-info">
          <span class="user-email">
            {{ user.email }}
          </span>
          <span class="user-date">
            Đăng ký: {{
              context.generateDateFormatted({
                value: user.created_at,
              })
            }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 600px;
  margin-inline: auto;

  display: flex;
  flex-direction: column;
  gap: var(--size-space-small);
}

.users-container > .title {
  text-align: center;
  font-size: var(--font-size-label-large);
}

.users-container > .users-list {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-small);
}

.users-container > .users-list > .user-card {
  background: var(--color-neutral-50);
  border: 1px solid var(--color-gray-50);
  border-radius: var(--size-border-radius);
  padding: var(--size-space-medium);
  transition: box-shadow 0.2s;
}

.users-container > .users-list > .user-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.users-container > .users-list > .user-card > .user-info {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-small);
}

.users-container > .users-list > .user-card > .user-info > .user-email {
  font-weight: var(--font-weight-semibold);
}

.users-container > .users-list > .user-card > .user-info > .user-date {
  font-size: var(--font-size-body-small);
  opacity: 0.7;
}
</style>
