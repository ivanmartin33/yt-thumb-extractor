<script setup lang="ts">
import { MoonIcon, SunIcon, User2Icon, DatabaseIcon, ClockIcon, ViewIcon, TimerIcon, SlidersHorizontalIcon, Wand, ScalingIcon } from "lucide-vue-next"
const showMetadata = defineModel('showMetadata', { default: true, type: Boolean })
const showAvatar = defineModel('showAvatar', { default: true, type: Boolean })
const showTitle = defineModel('showTitle', { default: true, type: Boolean })
const showDuration = defineModel('showDuration', { default: true, type: Boolean })
const showViews = defineModel('showViews', { default: true, type: Boolean })
const showTimeSince = defineModel('showTimeSince', { default: true, type: Boolean })
const showProgress = defineModel('showProgress', { default: true, type: Boolean })
const isDark = defineModel('isDark', { default: 'light', type: String })
const progress = defineModel<Array<number>>('progress', { default: [37], type: Array })
const isTransparent = defineModel('isTransparent', { default: false, type: Boolean })
const padding = defineModel<Array<number>>('padding', { default: [50], type: Array })
const cornerRadius = defineModel<Array<number>>('cornerRadius', { default: [50], type: Array })
const globalDisabled = defineModel('globalDisabled', { default: false, type: Boolean })

</script>

<template>
  <ShCard class="h-full">
    <ShCardHeader>
      <ShCardTitle>Settings</ShCardTitle>
      <ShCardDescription>Adjust your style</ShCardDescription>
    </ShCardHeader>
    <ShCardContent class="flex flex-wrap gap-3.75">

      <div class="switchers">
        <ShToggleGroup :size="'sm'" v-model="isDark" :disabled="globalDisabled">
          <ShToggleGroupItem value="light">
            <SunIcon />
          </ShToggleGroupItem>
          <ShToggleGroupItem value="dark">
            <MoonIcon />
          </ShToggleGroupItem>
        </ShToggleGroup>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="isTransparent" ><Wand /></ShToggle>
      </div>

      <ShSeparator orientation="horizontal" />

      <div class="switchers">
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showMetadata" :disabled="globalDisabled"><DatabaseIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showAvatar" :disabled="!showMetadata || globalDisabled"><User2Icon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showDuration" :disabled="!showMetadata || globalDisabled"><ClockIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showViews" :disabled="!showMetadata || globalDisabled"><ViewIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showTimeSince" :disabled="!showMetadata || globalDisabled"><TimerIcon /></ShToggle>
      </div>

      <ShSeparator orientation="horizontal" />
      <div class="flex items-center justify-between w-full gap-2">
        <!-- <ShSwitch :checked="showProgress" @update:checked="showProgress = !showProgress" /> -->
        <label class="text-sm text-slate">Progress</label>
        <ShToggle class="border-none w-fit" :size="'sm'" v-model:pressed="showProgress" :disabled="globalDisabled"><SlidersHorizontalIcon /></ShToggle> 
      </div>
      <ShSlider :max="100" :step="1" v-model="progress" :disabled="!showProgress || globalDisabled" @dblclick="progress = [50]"/>

      <ShSeparator orientation="horizontal" />
      <div>
        <label class="text-sm text-slate">Padding</label>
      </div>
      <ShSlider :max="100" :step="1" v-model="padding" @dblclick="padding = [50]" :disabled="globalDisabled"/>

      <ShSeparator orientation="horizontal" />
      <div >
        <label class="text-sm text-slate">Corner Radius</label>
      </div>
      <ShSlider :max="100" :step="1" v-model="cornerRadius" @dblclick="cornerRadius = [50]" :disabled="globalDisabled"/>
      
    </ShCardContent>
  </ShCard>
</template>

<style scoped>

.switchers {
  @apply flex flex-row items-center justify-start gap-2 text-xs;
}

</style>