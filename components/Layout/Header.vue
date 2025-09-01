<script>
import {
  defineComponent
} from "vue"

import Dropdown from "~/components/Dropdown.vue"
import Button from "~/components/Button.vue"

export default defineComponent({
  name: "Header",
  components: {
    Dropdown,
    Button
  },
  methods: {
    logout() {
      alert("Logging out...") // thay bằng logic logout thật
    },
  },
})
</script>

<template>
  <header class="header">
    <div class="header-container">
      <!-- Left: Logo -->
      <div class="header-logo">
        <h1>QLDT</h1>
      </div>
      <!-- Right: User actions -->
      <div class="header-actions">
        <!-- User profile dropdown -->
        <Dropdown dropdownPosition="right">
          <template #trigger="{ isOpen }">
            <div class="user-profile">
              <div class="profile-avatar">
                <span>U</span>
              </div>
              <span class="profile-name">User</span>
              <span class="dropdown-arrow">▼</span>
            </div>
          </template>
          <template #content="{ close }">
            <div class="user-dropdown-content">
              <div class="dropdown-item">
                <span>Profile</span>
              </div>
              <div class="dropdown-item">
                <span>Settings</span>
              </div>
              <div class="dropdown-item" @click="logout(); close()">
                <span>Logout</span>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: calc(var(--size-header-height) * 1.3); /* Increased header height by 30% */
  background-color: var(--color-white, #ffffff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--size-space-large);
  max-width: auto;
  margin: 0 var(--size-space-large);
}

.header-logo h1 {
  font-size: var(--font-size-heading-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-700);
  margin: 0;
}

/* Navigation */
.header-navigation {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--size-space-xx-large);
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: var(--color-slate-700);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  transition: color 0.2s ease;
  padding: var(--size-space-small) 0;
}

.nav-link:hover {
  color: var(--color-blue-600);
}

.nav-link:hover::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: var(--color-blue-600);
}

/* Header actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--size-space-large);
}

/* Search box styles removed */

/* User profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: var(--size-space-medium);
  cursor: pointer;
  padding: var(--size-space-medium) var(--size-space-large);
  border-radius: var(--size-border-radius);
  transition: background-color 0.2s ease;
}

.user-profile:hover {
  background-color: var(--color-gray-100);
}

.profile-avatar {
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

.profile-name {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-800);
}

.dropdown-arrow {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-left: var(--size-space-tiny);
  transition: transform 0.2s ease;
}

.user-profile:hover .dropdown-arrow {
  color: var(--color-slate-700);
}

/* Dropdown content */
.user-dropdown-content {
  min-width: 180px;
  background-color: white;
  border-radius: var(--size-border-radius);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dropdown-item {
  padding: var(--size-space-medium) var(--size-space-large);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--color-gray-100);
}

.dropdown-item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-200);
}
</style>
