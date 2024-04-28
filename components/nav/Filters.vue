<script setup lang="ts">
import { MoonIcon, SunIcon, User2Icon, DatabaseIcon, ClockIcon, ViewIcon, TimerIcon, SlidersHorizontalIcon, Wand, ScalingIcon } from "lucide-vue-next"
const { store: props } = storeToRefs(useMainStore())
const { defaultVideoCardProps } = useMainStore()

const reset = () => {
  props.value.showMetadata = defaultVideoCardProps.showMetadata
  props.value.showAvatar = defaultVideoCardProps.showAvatar
  props.value.showTitle = defaultVideoCardProps.showTitle
  props.value.showDuration = defaultVideoCardProps.showDuration
  props.value.showViews = defaultVideoCardProps.showViews
  props.value.showTimeSince = defaultVideoCardProps.showTimeSince
  props.value.showProgress = defaultVideoCardProps.showProgress
  props.value.isDark =  defaultVideoCardProps.isDark
  props.value.progress =  defaultVideoCardProps.progress
  props.value.isTransparent = defaultVideoCardProps.isTransparent
  props.value.padding = defaultVideoCardProps.padding
  props.value.cornerRadius = defaultVideoCardProps.cornerRadius
}

</script>

<template>
  <ShCard class="h-full">
    <ShCardHeader>
      <ShCardTitle>Settings</ShCardTitle>
      <ShCardDescription>Adjust your style</ShCardDescription>
    </ShCardHeader>
    <ShCardContent class="flex flex-wrap gap-3.75">

      <div class="switchers">
        <ShToggleGroup :size="'sm'" v-model="props.isDark" :disabled="props.globalDisabled">
          <ShToggleGroupItem value="light">
            <SunIcon />
          </ShToggleGroupItem>
          <ShToggleGroupItem value="dark">
            <MoonIcon />
          </ShToggleGroupItem>
        </ShToggleGroup>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.isTransparent" ><Wand /></ShToggle>
      </div>

      <ShSeparator orientation="horizontal" />

      <div class="switchers">
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.showMetadata" :disabled="props.globalDisabled"><DatabaseIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.showAvatar" :disabled="!props.showMetadata || props.globalDisabled"><User2Icon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.showDuration" :disabled="!props.showMetadata || props.globalDisabled"><ClockIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.showViews" :disabled="!props.showMetadata || props.globalDisabled"><ViewIcon /></ShToggle>
        <ShToggle class="border-none" :size="'sm'" v-model:pressed="props.showTimeSince" :disabled="!props.showMetadata || props.globalDisabled"><TimerIcon /></ShToggle>
      </div>

      <ShSeparator orientation="horizontal" />
      <div class="flex items-center justify-between w-full gap-2">
        <!-- <ShSwitch :checked="showProgress" @update:checked="showProgress = !showProgress" /> -->
        <label class="text-sm text-slate">Progress</label>
        <ShToggle class="border-none w-fit" :size="'sm'" v-model:pressed="props.showProgress" :disabled="props.globalDisabled"><SlidersHorizontalIcon /></ShToggle> 
      </div>
      <ShSlider :max="100" :step="1" v-model="props.progress" :disabled="!props.showProgress || props.globalDisabled" @dblclick="props.progress = [50]"/>

      <ShSeparator orientation="horizontal" />
      <div>
        <label class="text-sm text-slate">Padding</label>
      </div>
      <ShSlider :max="100" :step="1" v-model="props.padding" @dblclick="props.padding=[50]" :disabled="props.globalDisabled"/>

      <ShSeparator orientation="horizontal" />
      <div >
        <label class="text-sm text-slate">Corner Radius</label>
      </div>
      <ShSlider :max="100" :step="1" v-model="props.cornerRadius" @dblclick="props.cornerRadius=[50]" :disabled="props.globalDisabled"/>
      
    </ShCardContent>
    <ShCardFooter>
      <ShButton :disabled="props.globalDisabled" @click="reset" class="font-bold cursor-pointer">Reset</ShButton>
    </ShCardFooter>
  </ShCard>
</template>

<style scoped>

.switchers {
  @apply flex flex-row items-center justify-start gap-2 text-xs;
}

</style>