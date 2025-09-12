<script>
import {
  defineComponent,
} from "vue"

import Avatar from "~/components/Avatar.vue"

export default defineComponent({
  name: "DemoAvatar",

  components: {
    Avatar,
  }
})
</script>

<template>
  <div class="unit-container">
    <!-- Avatar có hình -->
    <h2>
      Avatar có hình
    </h2>
    <div class="unit-avatar">
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User Avatar"
        name="Nguyen Van A"
        size="md"
        rounded
        bordered
      />

      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User Avatar"
        name="Nguyen Van A"
        size="lg"
        rounded
        bordered
      />
    </div>

    <!-- Avatar fallback (hiện chữ khi không có ảnh) -->
    <h2>
      Avatar fallback
    </h2>
    <div class="unit-avatar">
      <Avatar
        name="Tran B"
        size="md"
        bordered
      />

      <Avatar
        name="Tran B"
        size="xl"
        bordered
      />
    </div>

    <!-- Avatar disabled -->
    <h2>
      Avatar disabled
    </h2>
    <div class="unit-avatar">
      <Avatar
        src="https://i.pravatar.cc/150?img=8"
        name="Disabled User"
        size="sm"
        rounded
        :isDisabled="true"
      />

      <Avatar
        src="https://i.pravatar.cc/150?img=8"
        name="Disabled User"
        size="md"
        rounded
        :isDisabled="true"
      />
    </div>

    <!-- Avatar không tròn -->
    <h2>
      Avatar không tròn
    </h2>
    <div class="unit-avatar">
      <Avatar
        src="https://i.pravatar.cc/150?img=5"
        name="Square Avatar"
        size="md"
        :rounded="false"
      />

      <Avatar
        src="https://i.pravatar.cc/150?img=5"
        name="Square Avatar"
        size="xl"
        :rounded="false"
      />
    </div>
  </div>
</template>

<style scoped>
.unit-container {
  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-medium);

  display: flex;
  flex-direction: column;
  align-items: start;

  gap: var(--size-space-medium);
}

.unit-container > .unit-avatar {
  display: flex;
  align-items: center;
  gap: var(--size-space-medium);
}
</style>
