<template>
  <div class="darkMode rounded-xl w-full py-4 px-8 animate-pulse">
    <div class="flex flex-col gap-4 w-full md:min-h-sm  justify-center">
      <ShAspectRatio :ratio="16 / 9" class="rounded-xl overflow-hidden relative isolate">
        <div class="w-full h-full bg-slate"></div>
        <div
          class="absolute bg-black text-xs text-white font-medium bg-op-60 bottom-0 right-0 py-0.5 px-1.25 m-2.25 rounded h-4 w-8"/>

        <div class="absolute bottom-0 w-full">
          <ShProgress class="rounded-none h-1.25" />
        </div>
      </ShAspectRatio>
      <div class="flex gap-4">
        <div>
          <ShAvatar class="bg-slate">
          </ShAvatar>
        </div>
        <div class="flex flex-col space-y-2">
          <div class="space-y-2">
            <div class="text-lg font-semibold bg-slate w-60 h-6 rounded-sm"/>
            <div class="text-sm text-gray-500 bg-slate w-30 h-2 rounded-sm" />
          </div>
          <div class="flex justify-start space-x-2">
            <div class="text-sm text-gray-500 bg-slate w-10 h-2 rounded-sm" />
            <div
              class="text-sm text-gray-500 bg-slate w-10 h-2 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
[data-theme="light"] {
    --font-color: #222222;
    --slate-6: #f6f3f0;
    --bg-color: #f6f3f0;
}

[data-theme="dark"] {
    --font-color: #f6f3f0;
    --slate-6: #222222;
    --bg-color: #050505;
}

.darkMode {
    @apply text-[var(--font-color)] bg-[var(--bg-color)];
}
</style>