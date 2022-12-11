<template>
    <v-container class="py-2 px-2">
        <v-row>
            <v-col cols="12" class="d-flex flex-row">
                <v-btn class="ma-2" variant="text" icon="mdi-arrow-left" @click="goBack"></v-btn>
                <v-spacer></v-spacer>
                <div class="text-h3 text-center">{{ house?.name }}</div>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" variant="text" :icon="isFav ? 'mdi-heart' : 'mdi-heart-outline'"
                    :color="isFav ? 'red' : ''" @click="onFav"></v-btn>
            </v-col>
            <v-col cols="12">
                <div class="text-body">{{ house?.description }}</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex flex-wrap">
                <v-img  v-for="image in items" class="bg-white w-50" :aspect-ratio="1"
                    :src="image.src"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
const client = useSupabaseClient()
const route = useRoute()
const isFav = ref(false)
const { data: houses } = await client.from('houses').select('id, name, price, price_per_person, size, region, description').eq('visible', true).eq('id', route.params.id).order('created_at')
const house = ref(houses ? houses[0] : null)
const items = [
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
]

function onFav() {
    isFav.value = !isFav.value
}

function goBack() {
    navigateTo('/')
}
</script>
<style scoped>

</style>