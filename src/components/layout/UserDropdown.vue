<template>
  <div class="relative" @click.stop>
    <button
      type="button"
      class="
        flex items-center gap-2
        px-3 py-2
        text-white font-medium
        hover:text-violet-200
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-600
        rounded-md
      "
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="toggle"
    >
      <UserAvatar :email="email" size="sm" />
      <span class="truncate max-w-[140px]">{{ userName }}</span>
      <ChevronDown
        :size="14"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul
        v-show="isOpen"
        class="
          absolute right-0 mt-2
          w-56
          bg-white
          rounded-md shadow-lg
          border border-gray-200
          py-1 z-50
          origin-top-right
        "
        role="menu"
      >
        <li>
          <router-link
            to="/perfil"
            class="
              flex items-center gap-2
              px-4 py-2
              text-sm text-gray-900
              hover:bg-gray-100
              transition-colors
            "
            role="menuitem"
            @click="close"
          >
            <User :size="16" aria-hidden="true" />
            <span>Ver perfil</span>
          </router-link>
        </li>
        <li class="my-1 border-t border-gray-200" role="separator"></li>
        <li>
          <button
            type="button"
            class="
              flex items-center gap-2 w-full text-left
              px-4 py-2
              text-sm text-gray-900
              hover:bg-gray-100
              transition-colors
            "
            role="menuitem"
            @click="onLogout"
          >
            <LogOut :size="16" aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { User, ChevronDown, LogOut } from 'lucide-vue-next';
import UserAvatar from '../ui/UserAvatar.vue';

export default {
  name: 'UserDropdown',
  components: { User, ChevronDown, LogOut, UserAvatar },
  props: {
    userName: { type: String, default: 'Usuario' },
    email: { type: String, default: '' },
  },
  emits: ['logout'],
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    handleOutsideClick() {
      this.close();
    },
    handleEscape(event) {
      if (event.key === 'Escape') this.close();
    },
    onLogout() {
      this.close();
      this.$emit('logout');
    },
  },
};
// @click.stop en el wrapper evita que el click interno cierre el dropdown
// El listener global cierra el menú al hacer click afuera
// ESC también cierra (accesibilidad)
</script>