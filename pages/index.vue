<script>
import {
  defineComponent,
  ref,
  onMounted,
} from 'vue'

import Skeleton from '~/components/Skeleton.vue'
import Button from '~/components/Button.vue'
import Avatar from '~/components/Avatar.vue'

export default defineComponent({
  name: 'BlogPage',

  components: {
    Skeleton,
    Button,
    Avatar,
  },

  setup() {
    const isLoading = ref(true)
    const user = ref({})
    const posts = ref([])
    const stats = ref({})
    const popularTags = ref([])

    // Simulate API call
    const loadData = async () => {
      setTimeout(() => {
        user.value = {
          name: 'Nguyễn Văn A',
          bio: 'Developer & Writer | Yêu thích công nghệ và chia sẻ kiến thức',
          avatar: 'https://i.pravatar.cc/150?img=3'
        }

        posts.value = [
          {
            id: 1,
            title: 'Học Vue.js từ cơ bản đến nâng cao',
            excerpt: 'Vue.js là một framework JavaScript tiên tiến để xây dựng giao diện người dùng. Bài viết này sẽ hướng dẫn bạn từ những khái niệm cơ bản...',
            author: {
              name: 'Ethan Walker',
              avatar: 'https://i.pravatar.cc/100'
            },
            createdAt: '2025-09-16T10:00:00Z'
          },
          {
            id: 2,
            title: 'Tối ưu hiệu suất ứng dụng web',
            excerpt: 'Hiệu suất là yếu tố quan trọng quyết định trải nghiệm người dùng. Cùng tìm hiểu các kỹ thuật tối ưu hiệu suất cho ứng dụng web...',
            author: {
              name: 'Noah Bennett',
              avatar: 'https://i.pravatar.cc/80'
            },
            createdAt: '2025-09-16T14:30:00Z'
          },
          {
            id: 3,
            title: 'CSS Grid vs Flexbox: Khi nào nên dùng?',
            excerpt: 'CSS Grid và Flexbox đều là công cụ mạnh mẽ cho layout. Nhưng khi nào nên sử dụng Grid và khi nào nên dùng Flexbox?...',
            author: {
              name: 'Ava Thompson',
              avatar: 'https://i.pravatar.cc/50'
            },
            createdAt: '2025-09-16T09:15:00Z'
          }
        ]

        stats.value = {
          totalPosts: 25,
          totalViews: '12.5K',
          followers: 486
        }

        popularTags.value = ['Vue.js', 'JavaScript', 'CSS', 'HTML', 'Web Development']

        isLoading.value = false
      }, 2000)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    onMounted(() => {
      loadData()
    })

    return {
      isLoading,
      user,
      posts,
      stats,
      popularTags,
      formatDate
    }
  }
})
</script>

<template>
  <div class="page-container">
    <!-- Header Section -->
    <header class="header-section">
      <div
        class="profile-header"
        v-if="isLoading"
      >
        <Skeleton type="avatar" />
        <div class="profile-info">
          <Skeleton type="title" />
          <Skeleton type="desc" />
        </div>
      </div>
      <div
        class="profile-header"
        v-else
      >
        <Avatar
          :src="user.avatar"
          :alt="user.name"
          size="xl"
        />
        <div class="profile-info">
          <h1 class="user-name">
            {{ user.name }}
          </h1>
          <p class="user-bio">
            {{ user.bio }}
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Posts Section -->
      <section class="posts-section">
        <h2 class="section-title">
          Bài viết gần đây
        </h2>

        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="posts-grid"
        >
          <article
            class="post-card"
            v-for="n in 3"
            :key="n"
          >
            <div class="post-header">
              <Skeleton type="avatar" />
              <div class="post-meta">
                <Skeleton type="title" />
                <Skeleton type="desc" />
              </div>
            </div>
            <Skeleton type="desc" />
            <Skeleton type="desc" />
            <Skeleton type="desc" />
          </article>
        </div>

        <!-- Loaded Content -->
        <div
          v-else
          class="posts-grid"
        >
          <article
            v-for="post in posts"
            :key="post.id"
            class="post-card"
          >
            <div class="post-header">
              <Avatar
                :src="post.author.avatar"
                :alt="post.author.name"
              />
              <div class="post-meta">
                <h3 class="post-author">
                  {{ post.author.name }}
                </h3>
                <time class="post-date">{{ formatDate(post.createdAt) }}</time>
              </div>
            </div>
            <h4 class="post-title">
              {{ post.title }}
            </h4>
            <p class="post-excerpt">
              {{ post.excerpt }}
            </p>
            <div class="post-actions">
              <Button variant="primary">
                Đọc thêm
              </Button>
              <Button variant="warning">
                Chia sẻ
              </Button>
            </div>
          </article>
        </div>
      </section>

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="widget">
          <h3 class="widget-title">
            Thông tin
          </h3>
          <div
            v-if="isLoading"
            class="widget-content"
          >
            <Skeleton type="title" />
            <Skeleton type="desc" />
            <Skeleton type="desc" />
          </div>
          <div
            v-else
            class="widget-content"
          >
            <p>Tổng bài viết: {{ stats.totalPosts }}</p>
            <p>Lượt xem: {{ stats.totalViews }}</p>
            <p>Người theo dõi: {{ stats.followers }}</p>
          </div>
        </div>

        <div class="widget">
          <h3 class="widget-title">
            Tags phổ biến
          </h3>
          <div
            v-if="isLoading"
            class="widget-content"
          >
            <Skeleton type="desc" />
            <Skeleton type="title" />
            <Skeleton type="desc" />
          </div>
          <div
            v-else
            class="tag-list"
          >
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </aside>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div
        v-if="isLoading"
        class="footer-content"
      >
        <Skeleton type="title" />
        <Skeleton type="desc" />
      </div>
      <div
        v-else
        class="footer-content"
      >
        <p>&copy; 2025 Blog của tôi. Tất cả quyền được bảo lưu.</p>
        <nav class="footer-nav">
          <a href="/about">Giới thiệu</a>
          <a href="/contact">Liên hệ</a>
          <a href="/privacy">Chính sách</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--size-border-radius);

  display: flex;
  flex-direction: column;
  gap: var(--size-space-x-large);

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Styles */
.page-container > .header-section {
  border-radius: var(--size-border-radius);
  padding: var(--size-space-xx-large);
  margin-block-end: var(--size-space-medium);

  background: linear-gradient(var(--color-linear-gradient));
  color: white;
}

.page-container > .header-section > .profile-header {
  display: flex;
  align-items: center;
  gap: var(--size-space-medium);
}

.page-container > .header-section > .profile-header > .profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--size-space-tiny);
}

.page-container > .header-section > .profile-header > .profile-info > .user-name {
  font-size: var(--font-size-title-medium);
  font-weight: var(--font-weight-bold);
}

.page-container > .header-section > .profile-header > .profile-info > .user-bio {
  font-size: var(--font-size-title-small);
}

/* Main Content */
.page-container > .main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--size-space-medium);
  align-items: start;
}

.page-container > .main-content > .posts-section {
  min-width: 0;
}

.page-container > .main-content > .posts-section > .section-title {
  border-block-end: 3px solid var(--color-blue-700);
  padding-block-end: var(--size-space-small);
  margin-block-end: var(--size-space-medium);

  color: var(--color-gray-900);
  font-size: var(--font-size-title-medium);
}

/* Posts */
.page-container > .main-content > .posts-section > .posts-grid {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-xx-large);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card {
  border: 1px solid var(--color-gray-100);
  border-radius: var(--size-border-radius);
  padding: var(--size-space-medium);

  display: flex;
  flex-direction: column;
  gap: var(--size-space-medium);

  background: white;

  box-shadow: var(--box-shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card:hover {
  box-shadow: var(--box-shadow);
  transform: translateY(-2px);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-header {
  margin-block-end: var(--size-space-small);

  display: flex;
  align-items: center;
  gap: var(--size-space-small);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-header > .post-meta {
  flex: 1;
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-header > .post-meta > .post-author {
  margin-block-end: var(--size-space-small);

  font-size: 0.95rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-header > .post-meta > .post-date {
  color: var(--color-gray-700);
  font-size: var(--font-size-body-small);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-title {
  margin-block-end: var(--size-space-small);

  color: var(--color-gray-900);
  font-size: var(--font-size-title-medium);
  font-weight: var(--font-weight-semibold);
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-excerpt {
  margin-block-end: var(--size-space-small);

  color: var(--color-gray-700);
  line-height: 1.6;
}

.page-container > .main-content > .posts-section > .posts-grid > .post-card > .post-actions {
  display: flex;
  gap: var(--size-space-medium);
}

/* Sidebar */
.page-container > .main-content > .sidebar {
  position: sticky;
}

.page-container > .main-content > .sidebar > .widget {
  border: 1px solid var(--color-gray-100);
  border-radius: var(--size-border-radius);

  padding: var(--size-space-medium);
  margin-block-end: var(--size-space-medium);

  box-shadow: var(--box-shadow);
  background: white;
}

.page-container > .main-content > .sidebar > .widget > .widget-title {
  border-block-end: 2px solid var(--color-gray-100);
  padding-block-end: var(--size-space-small);
  margin-block-end: var(--size-space-small);

  color: var(--color-gray-900);
  font-size: var(--font-size-title-small);
  font-weight: var(--font-weight-semibold);
}

.page-container > .main-content > .sidebar > .widget > .widget-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-tiny);
}

.page-container > .main-content > .sidebar > .widget > .widget-content > p {
  margin-block: var(--size-space-small);

  color: var(--color-gray-700);
}

.page-container > .main-content > .sidebar > .widget > .tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-space-tiny);
}

.page-container > .main-content > .sidebar > .widget > .tag-list > .tag {
  border-radius: var(--size-border-radius-medium);
  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-tiny);

  background: var(--color-gray-200);
  color: var(--color-neutral-500);
  font-size: var(--font-size-body-small);
  font-weight: var(--font-weight-medium);

  cursor: pointer;
}

.page-container > .main-content > .sidebar > .widget > .tag-list > .tag:hover {
  background-color: var(--color-blue-700);
  color: var(--color-neutral-50);
}

/* Footer */
.page-container > .footer {
  border-radius: var(--size-border-radius);
  padding: var(--size-space-x-large);

  background-color: white;
  text-align: center;
}

.page-container > .footer > .footer-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-small);
  align-items: center;
}

.page-container > .footer > .footer-content > p {
  margin-block-end: var(--size-space-small);

  color: var(--color-gray-700);
}

.page-container > .footer > .footer-content > .footer-nav {
  display: flex;
  justify-content: center;
  gap: var(--size-space-medium);
}

.page-container > .footer > .footer-content > .footer-nav > a {
  color: var(--color-blue-500);
  font-weight: var(--font-weight-medium);
}

.page-container > .footer > .footer-content > .footer-nav > a:hover {
  text-decoration: underline;
}
</style>
