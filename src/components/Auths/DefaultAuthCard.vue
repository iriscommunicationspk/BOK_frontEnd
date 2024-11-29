<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div class="rounded-lg shadow-default bg-opacity-30 bg-[#FFFFFF] w-1/2">
    <div class="flex flex-wrap items-center">
      <div class="hidden w-full xl:block xl:w-[50%] px-26">
        <div class="text-center">
          <!-- <router-link class="mb-5.5 inline-block" to="/">
            <img
              class="hidden dark:block h-[80px]"
              src="@/assets/images/logo/logo-white.png"
              alt="Logo"
            />
            <img class="dark:hidden" src="@/assets/images/logo/logo-dark.svg" alt="Logo" />
          </router-link> -->
          <div class="flex flex-col justify-center items-center">
            <router-link to="/">
              <img
                src="@/assets/images/logo/logo.png"
                class="h-[130px] w-[150px]"
                alt="Logo"
                style="filter: drop-shadow(2px 8px 50px white)"
              />
            </router-link>
            <div class="w-full border-b mb-4"></div>
            <h1 class="text-3xl font-extrabold text-[#164176] tracking-tighter">
              B<span class="text-[#EF5930]">O</span>K
            </h1>
            <p class="text-[#EF5930]">Bank of Khayber</p>
          </div>

          <span class="mt-15 inline-block">
            <img />
          </span>
        </div>
      </div>
      <div class="w-full border-dark:border-strokedark xl:w-[50%]">
        <div class="w-full sm:p-12.5">
          <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            {{ props.title }}
          </h2>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>
