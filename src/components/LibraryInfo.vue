<script setup lang="ts">
import type { Library } from '@/shared/library.model';
import type { Modal } from 'bootstrap';
import { inject, onMounted, ref } from 'vue'

const bs = inject<any>('bs');

let modalRef: Modal;

const libraryInfo = ref<Library>();

onMounted(() => {
    modalRef = new bs.Modal('#libraryModal', {});
});

function openModal(library: Library) {
    libraryInfo.value = library;
    modalRef.show();
}

defineExpose({ openModal });
</script>

<template>
    <div class="modal fade" id="libraryModal" tabindex="-1" aria-labelledby="libraryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="libraryModalLabel">{{ libraryInfo?.CommonName }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Категория:</h5>
                    <p>{{ libraryInfo?.Category }}</p>

                    <h5>Общепринятое наименование:</h5>
                    <p>{{ libraryInfo?.CommonName }}</p>

                    <h5>Полное официальное наименование:</h5>
                    <p>{{ libraryInfo?.FullName }}</p>

                    <h5>Сокращенное официальное наименование:</h5>
                    <p>{{ libraryInfo?.ShortName }}</p>

                    <h5>Вышестоящая организация:</h5>
                    <p>{{ libraryInfo?.ChiefOrg }}</p>

                    <h5>ФИО руководителя:</h5>
                    <p>{{ libraryInfo?.ChiefName }}</p>

                    <h5>Должность руководителя:</h5>
                    <p>{{ libraryInfo?.ChiefPosition }}</p>

                    <h5>Адреса объекта:</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="address of libraryInfo?.ObjectAddress"
                            :key="address.global_id">
                            {{ address.Address }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>