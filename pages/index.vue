<script>
import {
  defineComponent,
  ref,
  onMounted,
} from 'vue'

import Skeleton from '~/components/Skeleton.vue'
import Button from '~/components/Button.vue'

export default defineComponent({
  name: 'BlogPage',

  components: {
    Skeleton,
    Button,
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
            createdAt: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            title: 'Tối ưu hiệu suất ứng dụng web',
            excerpt: 'Hiệu suất là yếu tố quan trọng quyết định trải nghiệm người dùng. Cùng tìm hiểu các kỹ thuật tối ưu hiệu suất cho ứng dụng web...',
            author: {
              name: 'Noah Bennett',
              avatar: 'https://i.pravatar.cc/80'
            },
            createdAt: '2024-01-10T14:30:00Z'
          },
          {
            id: 3,
            title: 'CSS Grid vs Flexbox: Khi nào nên dùng?',
            excerpt: 'CSS Grid và Flexbox đều là công cụ mạnh mẽ cho layout. Nhưng khi nào nên sử dụng Grid và khi nào nên dùng Flexbox?...',
            author: {
              name: 'Ava Thompson',
              avatar: 'https://i.pravatar.cc/50'
            },
            createdAt: '2024-01-05T09:15:00Z'
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
        <img
          :src="user.avatar"
          :alt="user.name"
          class="avatar"
        >
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
          class="posts-loading"
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
              <img
                :src="post.author.avatar"
                :alt="post.author.name"
                class="post-avatar"
              >
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
            class="widget-loading"
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
            class="widget-loading"
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
        class="footer-loading"
      >
        <Skeleton type="title" />
        <Skeleton type="desc" />
      </div>
      <div
        v-else
        class="footer-content"
      >
        <p>&copy; 2024 Blog của tôi. Tất cả quyền được bảo lưu.</p>
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Styles */
.header-section {
  background: linear-gradient(var(--color-linear-gradient));
  color: white;
  padding: var(--size-space-xx-large);
  border-radius: var(--size-border-radius);
  margin-block-end: var(--size-space-medium);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--size-border-radius);
}

.avatar, .post-avatar {
  width: var(--size-avatar-lg);
  height: var(--size-avatar-lg);
  border-radius: 50%;
  object-fit: cover;
}

.post-avatar {
  width: var(--size-avatar-md);
  height: var(--size-avatar-md);
}

.profile-info {
  flex: 1;
}

.user-name {
  font-size: 2rem;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.user-bio {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

.posts-section {
  min-width: 0;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #333;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
}

/* Posts */
.posts-loading,
.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.post-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.post-meta {
  flex: 1;
}

.post-author {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.post-date {
  font-size: 0.85rem;
  color: #666;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #edf2f7;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 20px;
}

.widget {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.widget-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 10px;
}

.widget-loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.widget-content p {
  margin: 8px 0;
  color: #666;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f1f5f9;
  color: #4a5568;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Footer */
.footer {
  margin-top: 50px;
  padding: 30px;
  background: #f8fafc;
  border-radius: 12px;
  text-align: center;
}

.footer-loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.footer-content p {
  margin: 0 0 15px 0;
  color: #666;
}

.footer-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-nav a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.footer-nav a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .user-name {
    font-size: 1.5rem;
  }
}
</style>
