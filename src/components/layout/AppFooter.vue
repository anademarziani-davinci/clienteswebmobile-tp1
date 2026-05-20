<script>
import AppLogo from '../ui/AppLogo.vue';

export default {
  name: 'AppFooter',
  components: { AppLogo },
};
</script>
<template>
  <footer class="border-t border-gray-200 py-8 sm:py-10 bg-white">
    <div class="container mx-auto px-4">
      <div
        class="
          grid grid-cols-1 lg:grid-cols-3
          gap-6 lg:gap-4
          items-center
        "
      >
        <!-- Perfil -->
        <div
          class="
            flex flex-col lg:flex-row
            items-center justify-center lg:justify-start
            gap-3
            text-center lg:text-left
          "
        >
          <img
            src="/img/alumna.webp"
            alt="Foto de Ana Demarziani"
            class="
              w-[70px] h-[70px]
              rounded-full
              object-cover
              shadow-sm
              flex-shrink-0
            "
          />
          <div class="min-w-0">
            <p class="font-bold text-gray-900 mb-0">Ana Demarziani</p>
            <p class="text-gray-500 text-sm mb-0">
              Edad: 35 años
            </p>
            <a
              href="mailto:ana.demarziani@davinci.edu.ar"
              class="
                text-gray-500 text-sm no-underline
                hover:text-violeta-600
                inline-flex items-center gap-1
                truncate max-w-full
              "
            >
            <span class="truncate">ana.demarziani@davinci.edu.ar</span>
            </a>
          </div>
        </div>
        <!-- Copyright -->
        <p class="text-center font-semibold text-gray-500 m-0 text-sm sm:text-base">
          © 2026 - airax
        </p>
        <!-- Logo airax -->
        <div class="flex justify-center lg:justify-end">
          <AppLogo variant="primary" logo-class="w-32 sm:w-36 h-auto" />
        </div>
      </div>
    </div>
  </footer>
</template>

