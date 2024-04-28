<script setup lang="ts">
import { MoonIcon, SunIcon, User2Icon, DatabaseIcon, ClockIcon, ViewIcon, TimerIcon, SlidersHorizontalIcon, Wand} from "lucide-vue-next"
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

</script>

<template>
  <ShCard>
    <ShCardHeader>
      <ShCardTitle>Settings</ShCardTitle>
      <ShCardDescription>Adjust your style</ShCardDescription>
    </ShCardHeader>
    <ShCardContent class="flex flex-wrap gap-2 switchers justify-start items-start">

      <div>
        <ShToggleGroup :size="'sm'" v-model="isDark">
          <ShToggleGroupItem value="light">
            <SunIcon />
          </ShToggleGroupItem>
          <ShToggleGroupItem value="dark">
            <MoonIcon />
          </ShToggleGroupItem>
        </ShToggleGroup>
        <label>Dark mode</label>
      </div>

      <ShSeparator orientation="horizontal" />

      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="isTransparent"><Wand /></ShToggle>
        <label>Transparent Background</label>
      </div>

      <ShSeparator orientation="horizontal" />

      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showMetadata"><DatabaseIcon /></ShToggle>
        <!-- <ShSwitch :checked="showMetadata" @update:checked="showMetadata = !showMetadata" /> -->
        <label>Metadata</label>
      </div>

      <ShSeparator orientation="horizontal" />

      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showAvatar" :disabled="!showMetadata"><User2Icon /></ShToggle>
        <!-- <ShSwitch :checked="showAvatar" @update:checked="showAvatar = !showAvatar" :disabled="!showMetadata" /> -->
        <label>Avatar</label>
      </div>
      <ShSeparator orientation="horizontal" />
      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showDuration" :disabled="!showMetadata"><ClockIcon /></ShToggle>
        <!-- <ShSwitch :checked="showDuration" @update:checked="showDuration = !showDuration" :disabled="!showMetadata" /> -->
        <label>Duration</label>
      </div>
      <ShSeparator orientation="horizontal" />
      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showViews" :disabled="!showMetadata"><ViewIcon /></ShToggle>
        <!-- <ShSwitch :checked="showViews" @update:checked="showViews = !showViews" :disabled="!showMetadata" /> -->
        <label>Views</label>
      </div>
      <ShSeparator orientation="horizontal" />
      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showTimeSince" :disabled="!showMetadata"><TimerIcon /></ShToggle>
        <!-- <ShSwitch :checked="showTimeSince" @update:checked="showTimeSince = !showTimeSince" :disabled="!showMetadata" /> -->
        <label>Time Since</label>
      </div>
      <ShSeparator orientation="horizontal" />
      <div>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="showProgress" ><SlidersHorizontalIcon /></ShToggle>
        <!-- <ShSwitch :checked="showProgress" @update:checked="showProgress = !showProgress" /> -->
        <label>Progress</label>
      </div>
      <ShSlider :max="100" :step="1" v-model="progress" :disabled="!showProgress" class="mt-1" />
    </ShCardContent>
  </ShCard>
</template>

<style scoped>

.switchers {
  div {
    @apply flex flex-row items-center justify-start gap-2 text-xs;
  }
}

</style>