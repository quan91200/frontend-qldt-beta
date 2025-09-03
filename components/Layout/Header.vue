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
  height: var(--size-header-height); /* Increased header height by 30% */
  background-color: var(--color-gray-100);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
}

.unit-header > .unit-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--size-space-large);
  width: 100%;
  margin: 0 var(--size-space-large);
}

.unit-header > .unit-header-container > .unit-logo > h1 {
  font-size: var(--font-size-heading-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-700);
  margin: 0;
}

/* Navigation */
.unit-header > .unit-header-container > .unit-header-navigation {
  flex: 1;
  display: flex;
  justify-content: center;
}

.unit-header > .unit-header-container > .unit-header-navigation > .nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--size-space-xx-large);
}

.unit-header > .unit-header-container > .unit-header-navigation > .nav-list > .nav-item {
  position: relative;
}

.unit-header > .unit-header-container > .unit-header-navigation > .nav-list > .nav-item > .nav-link {
  text-decoration: none;
  color: var(--color-slate-700);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  transition: color 0.2s ease;
  padding: var(--size-space-small) 0;
}

.unit-header > .unit-header-container > .unit-header-navigation > .nav-list > .nav-item > .nav-link:hover {
  color: var(--color-blue-600);
}

.unit-header > .unit-header-container > .unit-header-navigation > .nav-list > .nav-item > .nav-link:hover::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: var(--color-blue-600);
}

/* Header actions */
.unit-header > .unit-header-container > .unit-header-actions {
  display: flex;
  align-items: center;
  gap: var(--size-space-large);
}

/* Search box styles removed */

/* User profile */
.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile { /* lỗi đoạn này */
  display: flex;
  align-items: center;
  gap: var(--size-space-medium);
  cursor: pointer;
  padding: var(--size-space-medium) var(--size-space-large);
  border-radius: var(--size-border-radius);
  transition: background-color 0.2s ease;
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile:hover {
  background-color: var(--color-gray-100);
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile > .unit-profile-avatar {
  width: var(--size-avatar-md);
  height: var(--size-avatar-md);
  border-radius: 50%;
  background: var(--avatar-linear-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile > .unit-profile-name { /* lỗi đoạn này */
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-800);
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile > .unit-dropdown-arrow {
  font-size: var(--font-size-xl);
  color: var(--color-gray-500);
  margin-left: var(--size-space-tiny);
  transition: transform 0.2s ease;
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-profile:hover > .unit-dropdown-arrow {
  color: var(--color-slate-700);
}

/* Dropdown content */
.unit-header > .unit-header-container > .unit-header-actions > .unit-user-dropdown-content {
  min-width: 180px;
  background-color: white;
  border-radius: var(--size-border-radius);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-dropdown-content > .unit-dropdown-item {
  padding: var(--size-space-medium) var(--size-space-large);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-dropdown-content > .unit-dropdown-item:hover {
  background-color: var(--color-gray-100);
}

.unit-header > .unit-header-container > .unit-header-actions > .unit-user-dropdown-content > .unit-dropdown-item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-200);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
