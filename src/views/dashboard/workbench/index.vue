<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex">
      <!-- <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard class="enter-y" />
      </div> -->
      <!-- <div class="width:20% enter-y">
        <QuickNav class="enter-y" />
      </div> -->
      &nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <div class="w-5/6 enter-y">
        <SiteAnalysis class="enter-y" />
      </div>
    </div>
    &nbsp&nbsp
    <div>
      <DetailsForm />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import DetailsForm from './components/DetailsForm.vue';
  import QuickNav from './components/QuickNav.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
</script>
