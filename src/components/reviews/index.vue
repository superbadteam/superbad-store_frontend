<template>
  <div class="max-lg:flex-col max-lg:w-full w-[80%] flex gap-5">
    <OveralRating />
    <div class="flex-auto">
      <div class="flex w-full justify-between">
        <p class="text-xl font-bold">Customer reviews</p>
        <p class="font-bold">Sort by</p>
      </div>
      <div
        v-if="!isShowInput"
        class="flex justify-between bg-slate-100 w-full items-center px-5 border-[2px] rounded-lg py-5 mt-5"
      >
        <p>Share your thoughts with other customers</p>
        <div
          class="cursor-pointer flex py-2 px-3 whitespace-nowrap rounded-md bg-third-100 text-white"
          @click="isShowInput = !isShowInput"
        >
          Write a review
        </div>
      </div>
      <div v-if="isShowInput" class="flex flex-col gap-3 mt-5">
        <div class="flex gap-3">
          <LazyImg
            class-style="w-[50px] min-w-[50px] h-[50px] rounded-full object-cover"
            src="https://picsum.photos/200/300"
          />
          <div class="flex-auto border-[1px] h-20 rounded-lg">
            <textarea
              id=""
              placeholder="Enter you review..."
              class="w-full h-full bg-transparent"
              name=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div class="w-full flex justify-between pl-16">
          <div>
            <ReviewStars />
          </div>
          <div class="flex gap-2">
            <AButton title="Cancel" type="cancel">Cancel</AButton>
            <AButton title="Submit" type="confirm" class="bg-third-100">Submit</AButton>
          </div>
        </div>
      </div>
      <!-- comments -->
      <div class="mt-5">
        <CommentContent />
      </div>
    </div>
  </div>
</template>
<script setup>
import OveralRating from './rating/OveralRating.vue'
import CommentContent from './comment/CommentContent.vue'
import LazyImg from '../commons/atoms/LazyImg.vue'
import AButton from '../commons/atoms/AButton.vue'
import { ref } from 'vue'
import ReviewStars from './rating/ReviewStars.vue'
const isShowInput = ref(false)
</script>
