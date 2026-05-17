<script>
import BaseTitle from '../components/ui/BaseTitle.vue';
import AppLayout from '../layouts/AppLayout.vue'

export default {
    name: 'Home',
    components: { BaseTitle, AppLayout},
}
</script>

<template>
    <AppLayout>
        <BaseTitle
            title="Home"
         />
    </AppLayout>
</template>