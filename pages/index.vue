<script>
</script>

<template>
  <div class="page">z``
    <!-- Header -->
    <header class="header">
      <h1 class="title">
        Trang Chủ
      </h1>
      <nav class="nav">
        <a
          href="#"
          class="link"
        >Trang chủ</a>
        <a
          href="#"
          class="link"
        >Giới thiệu</a>
        <a
          href="#"
          class="link"
        >Liên hệ</a>
      </nav>
    </header>

    <!-- Main content -->
    <main class="content">
      <section class="card">
        <h2 class="heading">
          Xin chào 👋
        </h2>
        <p>Đây là template demo cho <code>pages/index.vue</code> sử dụng các biến CSS.</p>
      </section>

      <section class="card">
        <h2 class="heading">
          Màu sắc từ variables.css
        </h2>
        <div class="colors">
          <div
            class="color-box"
            style="background: var(--color-blue-500)"
          >
            Blue 500
          </div>
          <div
            class="color-box"
            style="background: var(--color-purple-500)"
          >
            Purple 500
          </div>
          <div
            class="color-box"
            style="background: var(--color-rose-500)"
          >
            Rose 500
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Demo Project</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-gray-50);
  font-family: var(--font-family-sans);
}

/* Header */
.header {
  height: var(--size-header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--size-space-large);
  background: linear-gradient(var(--color-linear-gradient));
  color: white;
}

.title {
  font-size: var(--font-size-title-medium);
  font-weight: var(--font-weight-bold);
}

.nav .link {
  margin-left: var(--size-space-medium);
  color: var(--color-gray-50);
  font-size: var(--font-size-body-medium);
}

/* Content */
.content {
  flex: 1;
  padding: var(--size-space-large);
  display: grid;
  gap: var(--size-space-large);
}

.card {
  background: white;
  border-radius: var(--size-border-radius);
  padding: var(--size-space-large);
  box-shadow: var(--box-shadow);
}

.heading {
  font-size: var(--font-size-heading-large);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--size-space-medium);
}

.colors {
  display: flex;
  gap: var(--size-space-medium);
}

.color-box {
  flex: 1;
  padding: var(--size-space-medium);
  color: white;
  border-radius: var(--size-border-radius-small);
  text-align: center;
  font-weight: var(--font-weight-medium);
}

/* Footer */
.footer {
  text-align: center;
  padding: var(--size-space-medium);
  background: var(--color-gray-200);
  font-size: var(--font-size-body-small);
}
</style>