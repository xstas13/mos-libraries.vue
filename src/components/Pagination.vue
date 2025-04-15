<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel<number>();

const props = defineProps({
    totalItems: {
        default: 0,
        type: Number,
    },
    itemsPerPage: {
        default: 5,
        type: Number,
    },
    maxSize: {
        default: 7,
        type: Number,
    }
});

const pages = computed(() => {
    const lenght: number = Math.ceil((props.totalItems || 0) / props.itemsPerPage);
    const pages: number[] = Array.from(Array(lenght + 1).keys());

    pages.shift();

    return pages;
});

const pagesShow = computed(() => {
    const page: number = (model.value || 0);

    let padding = page <= Math.ceil(props.maxSize / 2) ? 0 : page - Math.ceil(props.maxSize / 2);

    if (padding > pages.value.length - props.maxSize) {
        padding = pages.value.length - props.maxSize;
    }

    return pages.value.slice(padding, props.maxSize + padding);
});

const hasPrevious = computed(() => {
    return (model.value || 0) > 1;
});

const hasNext = computed(() => {
    return (model.value || 0) < pages.value.length;
});

function selectPage(page: number): void {
    model.value = page;
}

function clickPrevious(): void {
    selectPage((model.value || 0) - 1);
}

function clickNext(): void {
    selectPage((model.value || 0) + 1);
}
</script>

<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: !hasPrevious }">
                <a class="page-link" href="#" @click.prevent="clickPrevious"><i class="bi bi-arrow-left"></i></a>
            </li>

            <li class="page-item" v-for="page of pagesShow" :key="page">
                <a class="page-link" href="#" :class="{ active: page === model }" @click.prevent="selectPage(page)">{{ page
                }}</a>
            </li>

            <li class="page-item" :class="{ disabled: !hasNext }">
                <a class="page-link" href="#" @click.prevent="clickNext"><i class="bi bi-arrow-right"></i></a>
            </li>
        </ul>
    </nav>
</template>
