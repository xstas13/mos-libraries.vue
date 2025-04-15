import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { urlAddParams } from '@/shared/utils';
import type { LibrariesResp, Library } from '@/shared/library.model';
import { API_KEY, DATASETS_LIB_ERR_MESS, DATASETS_LIB_ID, DATASETS_PATH } from '@/config/main';

export const useLibrariesStore = defineStore('libraries', () => {
    const searchString = ref<string>('');
    const libraries = ref<Library[]>([]);
    const page = ref<number>(1);
    const pageSize = ref<number>(5);
    const loading = ref<boolean>(false);
    const error = ref<string>('');

    /**
     * Получение списка библиотек Москвы
     */
    async function fetchLibraries(searchStr: string): Promise<void> {
        if (loading.value) {
            return;
        }

        searchString.value = searchStr;
        libraries.value = [];

        const url = `${DATASETS_PATH}/${DATASETS_LIB_ID}/rows`;

        const params = {
            api_key: API_KEY,
            q: searchStr,
        };

        error.value = '';
        loading.value = true;
        page.value = 1;

        const resp = await fetch(urlAddParams(url, params));

        if (resp.ok) {
            const data: LibrariesResp[] = await resp.json();
            libraries.value = data.map((i, index) => {
                return { ...i.Cells, index }
            });
        } else {
            error.value = DATASETS_LIB_ERR_MESS;
        }

        loading.value = false;
    }

    const librariesByPage = computed(() => {
        const start = (page.value - 1) * pageSize.value;
        return libraries.value ? libraries.value.slice(start, start + pageSize.value) : [];
    });

    const count = computed(() => {
        return libraries.value.length;
    });

    return {
        libraries,
        loading,
        error,
        searchString,
        count,
        page,
        pageSize,
        librariesByPage,
        fetchLibraries,
    }
})