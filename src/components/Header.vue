<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid container">
            <RouterLink to="/" class="navbar-brand">Библиотеки</RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" custom v-slot="{ href, isActive }">
                            <a class="nav-link" :class="{ active: isActive }" aria-current="page"
                                :href="href">Главная</a>
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/catalog" custom v-slot="{ href, isActive }">
                            <a class="nav-link" :class="{ active: isActive }" aria-current="page"
                                :href="href">Каталог</a>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>