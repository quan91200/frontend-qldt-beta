<script>
import {
  defineComponent
} from "vue"

import {
  Icon,
} from "#components"

import Dropdown from "~/components/Dropdown.vue"

export default defineComponent({
  name: "Header",

  components: {
    Dropdown,
    Icon
  },
})
</script>

<template>
  <header class="unit-header">
    <div class="unit-header-container">
      <!-- Left: Logo -->
      <div class="unit-logo">
        <h1>QLDT</h1>
      </div>
      <!-- Right: User actions -->
      <div class="unit-header-actions">
        <!-- User profile dropdown -->
        <Dropdown dropdownPosition="right">
          <template #trigger="{ isOpen }">
            <div class="unit-user-profile">
              <div class="unit-profile-avatar">
                <span>
                  U
                </span>
              </div>
              <span class="unit-profile-name">
                User
              </span>
              <Icon
                name="mdi:chevron-down"
                class="unit-dropdown-arrow"
                :class="{ 'rotate-180': isOpen }"
              />
            </div>
          </template>
          <template #content="{ close }">
            <div class="unit-user-dropdown-content">
              <div class="unit-dropdown-item">
                <span>Profile</span>
              </div>
              <div class="unit-dropdown-item">
                <span>Settings</span>
              </div>
              <div
                class="unit-dropdown-item"
                @click="close()"
              >
                <span>
                  Logout
                </span>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.unit-header {
  width: 100%;
  height: var(--size-header-height);
  position: sticky;
}

.unit-header > .unit-header-container {
  padding-inline: var(--size-space-large);

  height: var(--size-header-height);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.unit-header > .unit-header-container > .unit-logo > h1 {
  font-size: var(--font-size-heading-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-500);
}

.unit-user-profile {
  border-radius: var(--size-border-radius);

  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-tiny);

  display: flex;
  align-items: center;
  gap: var(--size-space-medium);

  transition: background-color 0.2s ease;
}

.unit-user-profile:hover {
  background-color: var(--color-gray-200);
}

.unit-user-profile > .unit-profile-avatar {
  width: var(--size-avatar-md);
  height: var(--size-avatar-md);

  border-radius: var(--size-border-radius-full);
  background: var(--avatar-linear-gradient);

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-teal-50);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
}

.unit-user-profile > .unit-profile-name {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-800);
}

.unit-user-profile > .unit-dropdown-arrow {
  padding-inline: var(--size-space-medium);

  font-size: var(--font-size-xl);
  color: var(--color-gray-500);

  transition: transform 0.2s ease;
}

.unit-user-profile:hover > .unit-dropdown-arrow {
  color: var(--color-slate-700);
}

.unit-user-dropdown-content {
  min-width: 180px;
  overflow: hidden;
}

.unit-user-dropdown-content > .unit-dropdown-item {
  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-medium);

  cursor: pointer;

  transition: background-color 0.2s ease;
}

.unit-user-dropdown-content > .unit-dropdown-item:hover {
  background-color: var(--color-gray-100);
}

.unit-user-dropdown-content > .unit-dropdown-item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-200);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
