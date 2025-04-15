<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useLibrariesStore } from '@/stores/libraries';
import Libraries from '@/components/Libraries.vue';
import Pagination from '@/components/Pagination.vue';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'

const librariesStore = useLibrariesStore();

const required$ = () => helpers.withMessage('Строка поиска не может быть пустой.', required);
const minLength$ = (min: number) => helpers.withMessage(`Не менее чем ${min} символа.`, minLength(min));

const formSearchData = reactive({
  search: '',
});

const formSearchRules = {
  search: {
    required: required$(),
    minLength: minLength$(3),
  },
};

const v$ = useVuelidate(formSearchRules, formSearchData);

const showEmtyResult = computed(() => {
  return !librariesStore.loading &&
    librariesStore.count === 0 &&
    librariesStore.searchString &&
    !librariesStore.error;
});

async function submitSearchForm() {
  const formValid = await v$.value.$validate();

  if (formValid) {
    librariesStore.fetchLibraries(formSearchData.search);
  }
}
</script>

<template>
  <div class="container pt-4">
    <form class="mb-4" @submit.prevent="submitSearchForm">
      <div class="row">
        <div class="col">
          <label for="name" class="form-label">Поиск по имени</label>

          <input type="text" class="form-control" id="name" placeholder="Библиотека №42" maxlength="100"
            v-model="formSearchData.search" :disabled="librariesStore.loading"
            :class="{ 'is-invalid': v$.search.$invalid && v$.search.$dirty }">

          <div class="invalid-feedback" v-for="error in v$.search.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>

        <div class="col search__btn-wrapper">
          <button type="submit" class="btn btn-primary" :disabled="librariesStore.loading">Поиск</button>
        </div>
      </div>
    </form>

    <div class="spinner-border text-primary" role="status" v-if="librariesStore.loading">
      <span class="visually-hidden">Loading...</span>
    </div>

    <Pagination v-if="librariesStore.count > 0" :totalItems="librariesStore.count"
      :itemsPerPage="librariesStore.pageSize" v-model="librariesStore.page" />

    <Libraries v-if="librariesStore.count > 0" :libraries="librariesStore.librariesByPage"
      :search-text="librariesStore.searchString" />

    <Pagination v-if="librariesStore.count > 0" :totalItems="librariesStore.count"
      :itemsPerPage="librariesStore.pageSize" v-model="librariesStore.page" />

    <div class="alert alert-light" v-if="showEmtyResult">
      По запросу <b>"{{ librariesStore.searchString }}"</b> ничего не найдено.
    </div>

    <div class="alert alert-danger" v-if="librariesStore.error">
      {{ librariesStore.error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  &__btn-wrapper {
    margin-top: 32px;
  }
}
</style>