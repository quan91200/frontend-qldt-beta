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
        label: 'Profile',
        separator: true,
        iconName: 'ph:user-list',
      },
      {
        label: 'Tự nhập hồ sơ',
        href: '/tunhaphoso',
      },
      {
        label: 'Xin xác nhận',
        href: '/xinxacnhan',
      },
      {
        label: 'Góc học tập',
        separator: true,
        iconName: 'ph:newspaper-clipping',
      },
      {
        label: 'Tra cứu điểm',
        href: '/tracuudiem'
      },
      {
        label: 'Chương trình học',
        href: '/chuongtrinhhoc'
      },
      {
        label: 'Đăng ký công nhận điểm',
        href: '/dangkycongnhandiem'
      },
      {
        label: 'Đăng ký xin phúc khảo',
        href: '/dangkyxinphuckhao'
      },
      {
        label: 'Xét tốt nghiệp',
        href: '/xettotnghiep'
      },
      {
        label: 'Đăng ký trực tuyến',
        separator: true,
        iconName: 'ph:user-circle-dashed',
      },
      {
        label: 'Đăng ký học',
        href: '/dangkyhoc'
      },
      {
        label: 'Đăng ký nguyện vọng',
        href: '/dangkynguyenvong'
      },
      {
        label: 'Tra cứu kết quả đăng ký',
        href: '/tracuuketquadangky'
      },
      {
        label: 'Đăng ký thi',
        href: '/dangkythi'
      },
      {
        label: 'Thời khóa biểu',
        separator: true,
        iconName: 'ph:calendar-dots',
      },
       {
        label: 'Lịch học',
        href: '/lichhoc'
      },
       {
        label: 'Lịch thi',
        href: '/lichthi'
      },
      {
        label: 'Tài chính',
        separator: true,
        iconName: 'ph:currency-circle-dollar',
      },
       {
        label: 'Học phí',
        href: '/hocphi'
      },
       {
        label: 'Thanh toán học phí',
        href: '/thanhtoanhocphi'
      },
       {
        label: 'Bảng quyết toán cá nhân',
        href: '/quyettoan'
      },
      {
        label: 'Văn bản',
        separator: true,
        iconName: 'ph:files',
      },
       {
        label: 'Văn bản, quy định, biểu mẫu',
        href: '/vanban'
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
