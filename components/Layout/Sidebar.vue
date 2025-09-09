<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
  },

  setup() {
    const navLinks = [
      {
        label: 'Trang chủ',
        href: '/',
      },
      {
        label: 'Demo',
        separator: true,
        iconName: 'ph:monitor',
      },
      {
        label: 'Accordion',
        href: '/DemoAccordion',
      },
      {
        label: 'Badge',
        href: '/DemoBadge',
      },
      {
        label: 'Breadcrumb',
        href: '/DemoBreadcrumb',
      },
      {
        label: 'Button',
        href: '/DemoButton',
      },
      {
        label: 'Dropdown',
        href: '/DemoDropdown',
      },
      {
        label: 'Modal',
        href: '/DemoModal'
      },
    ]

    return {
      navLinks,
    }
  }
})
</script>

<template>
  <nav class="unit-container">
    <ul class="unit-navlinks">
      <li
        v-for="(navLink, index) of navLinks"
        :key="index"
        class="unit-li"
      >
        <div
          v-if="navLink?.separator"
          class="unit-group"
        >
          <Icon
            v-if="navLink.iconName"
            :name="navLink.iconName"
            class="icon"
          />
          <span class="label">
            {{ navLink.label }}
          </span>

          <hr
            class="separator"
          >
        </div>

        <NuxtLink
          v-else
          class="navlink"
          :to="navLink.href"
        >
          {{ navLink.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.unit-container {
  position: sticky;
  top: var(--size-header-height);
  width: var(--size-sidebar-width);

  max-height: calc(100vh - var(--size-header-height));
  overflow-y: auto;

  flex-shrink: 0;
}

.unit-container > .unit-navlinks {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-medium);
}

.unit-container > .unit-navlinks > .unit-li > .navlink {
  border-radius: var(--size-border-radius-full);

  padding: var(--size-space-medium);

  display: flex;
  align-items: center;
  gap: var(--size-space-medium);

  text-transform: capitalize;
  color: inherit;
  transition: background-color 0.15s ease-in, color 0.15s ease-in;
}

.unit-container > .unit-navlinks > .unit-li > .navlink:hover,
.unit-container > .unit-navlinks > .unit-li > .navlink:focus-visible {
  background-color: var(--color-gray-400);
}

.unit-container > .unit-navlinks > .unit-li > .navlink.router-link-active {
  background-color: var(--color-gray-500);
  color: var(--color-gray-100);
}

.unit-container > .unit-navlinks > .unit-li > .unit-group {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);

  padding-inline: var(--size-space-medium);

  color: var(--color-gray-400);
}

.unit-container > .unit-navlinks > .unit-li > .unit-group > .label {
  margin-inline-end: var(--size-space-small);
}

.unit-container > .unit-navlinks > .unit-li > .unit-group > .separator {
  border: 1px solid var(--color-gray-400);

  flex: 1;
}
</style>
