<script>
  import AppLogo from '../ui/AppLogo.vue';
  import NavLink from './NavLink.vue';
  import UserDropdown from './UserDropdown.vue';
  import { Menu, X } from 'lucide-vue-next';

  export default {
    name: 'AppHeader',
    components: { NavLink, UserDropdown, AppLogo },
    props: {
      userName: { type: String, default: 'Usuario' },
      userEmail: { type: String, default: '' },
    },
    emits: ['logout'],
    data() {
      return {
        mobileOpen: false,
        Menu,
        X,
      };
    },
    computed: {
      links() {
        return this.$router.getRoutes()
          .filter(route => route.meta?.label)
          .map(route => ({
            to: route.path,
            label: route.meta.label,
          }));
      },
    },
    watch: {
      $route() {
        this.mobileOpen = false;
      },
    },
  };
</script>
<template>
  <header class="bg-gradient-primary w-full">
    <nav class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center gap-2 text-white no-underline flex-shrink-0"
        >
          <AppLogo variant="white" />
        </router-link>

        <!-- Toggle mobile -->
        <button
          type="button"
          class="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-md"
          aria-label="Toggle navigation"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <component :is="mobileOpen ? X : Menu" :size="24" aria-hidden="true" />
        </button>

        <!-- Nav Desktop -->
        <div class="hidden lg:flex items-center gap-1">
          <NavLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :label="link.label"
          />

          <UserDropdown
            :user-name="userName"
            :email="userEmail"
            class="ml-2"
            @logout="$emit('logout')"
          />
        </div>
      </div>

      <!-- Nav Mobile (drawer) -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="mobileOpen"
          class="lg:hidden mt-3 pt-3"
        >
          <ul class="flex flex-col gap-1 mb-3">
            <li v-for="link in links" :key="link.to">
              <NavLink
                :to="link.to"
                :label="link.label"
                @click="mobileOpen = false"
              />
            </li>
          </ul>

          <div class="pt-3 border-t border-azul-500">
            <UserDropdown
              :user-name="userName"
              :email="userEmail"
              @logout="$emit('logout')"
            />
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>
