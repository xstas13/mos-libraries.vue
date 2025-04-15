<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true,
        default: '',
    },
    hlText: {
        type: String,
        required: true,
        default: '',
    },
    hlClass: {
        type: String,
        default: 'highlighted-text',
    },
});

const highlightedText = computed(() => {
    return props.text.replace(new RegExp(props.hlText, 'igm'), `<span class="${props.hlClass}">$&</span>`);
})
</script>

<template>
    <span class="highliter" v-html="highlightedText"></span>
</template>

<style scoped>
.highliter :deep() .highlighted-text {
    background-color: var(--text-selected, yellow);
}
</style>