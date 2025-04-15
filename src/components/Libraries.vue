<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { Library } from '@/shared/library.model';
import Highlighter from '@/components/Highlighter.vue';
import LibraryInfo from '@/components/LibraryInfo.vue';

defineProps({
    libraries: {
        type: Object as PropType<Library[]>,
        required: true,
        default: [],
    },
    searchText: {
        type: String,
        required: false,
        default: '',
    }
});

const refLibraryInfo = ref<any>(null);

function showLibraryInfo(library: Library) {
    refLibraryInfo.value.openModal(library);
}
</script>

<template>
    <table class="table" v-if="libraries && libraries.length > 0">
        <thead>
            <tr>
                <th>№</th>
                <th>Полное официальное наименование</th>
                <th>Адрес</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="library of libraries" :key="library.global_id">
                <td>{{ library.index + 1 }}</td>
                <td>
                    <Highlighter :text="library.FullName" :hl-text="searchText" />
                </td>
                <td>
                    <div class="bl-address" v-if="library.ObjectAddress[0]">
                        {{ library.ObjectAddress[0].Address }}
                    </div>
                </td>
                <td>
                    <button class="btn btn-light button-info" @click="showLibraryInfo(library)">
                        <i class="bi bi-box-arrow-up-right"></i>
                        Открыть
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <LibraryInfo ref="refLibraryInfo" />
</template>

<style lang="scss" scoped>
.table {
    .bl-address {
        border-bottom: var(--bs-border-width) solid var(--bs-border-color);
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;

        &:last-child {
            border: none;
            padding-bottom: 0;
            margin-bottom: 0;
        }
    }

    .button-info {
        width: 120px;

        >i {
            color: var(--bs-primary);
        }
    }
}
</style>