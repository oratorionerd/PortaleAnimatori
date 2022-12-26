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
                <v-col sm="12" md="6" lg="6" xl="6">
                    <div class="text-h6"><b><v-icon icon="mdi-bed"></v-icon> Posti</b> {{ house?.size }}</div>
                    <div class="text-h6"><b><v-icon icon="mdi-currency-usd"></v-icon> Costo</b> {{ house?.price }} €
                        {{ house?.price_per_person ? 'per persona' : '' }} {{ house?.bills_included ? 'spese incluse' :
                                'spese escluse'
                        }} </div>
                </v-col>
                <v-col sm="12" md="6" lg="6" xl="6">
                    <div class="text-h6"><b><v-icon icon="mdi-contacts"></v-icon> Contatti:</b> {{ house?.contact }}
                    </div>
                    <div class="text-h6"><b><v-icon icon="mdi-web"></v-icon> Sito:</b> <a :href="house?.website"
                            target="_blank">{{ house?.website }}</a></div>
                </v-col>
                <v-col cols="12">
                    <div class="text-h6"><b><v-icon icon="mdi-contacts"></v-icon> Località:</b> {{ house?.region }}
                    </div>
                    <div class="text-h6"><b><v-icon icon="mdi-web"></v-icon> Maps:</b> <a :href="house?.maps"
                            target="_blank">{{ house?.maps }}</a></div>
                </v-col>
                <v-col cols="12">
                    <div class="text-h4">Descrizione</div>
                    <div class="text-body">{{ house?.description }}</div>
                </v-col>
                <v-col cols="12" v-if="house?.note">
                    <div class="text-h4">Note</div>
                    <div class="text-body">{{ house?.note }}</div>
                </v-col>
            </v-row>
            <v-row v-if="images.length > 0">
                <v-col cols="12" class="d-flex flex-wrap">
                    <v-carousel :show-arrows="false">
                        <v-carousel-item v-for="(item, i) in images" :key="i" :src="item">
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </v-container>
</template>
<script async setup lang="ts">
import { Ref } from 'vue';

const client = useSupabaseClient()
const route = useRoute()
const isFav = ref(false)
const { data: houses } = await client.from('houses').select('id, name, price, price_per_person, size, region, description, images, website, contact, bills_included, note, maps').eq('visible', true).eq('id', route.params.id).order('created_at')
const house = ref(houses ? houses[0] : null)
const folder: string = houses ? houses[0].images : ''
const images: Ref<string[]> = ref([])
if (folder != null && folder.length > 0) {
    const { data, error } = await client
        .storage
        .from('images')
        .list(house.value?.images, {
            limit: 100,
            offset: 0
        })
    for (const img of data!) {
        if (img.name != ".emptyFolderPlaceholder") {
            images.value.push(`https://vawlcbfneflugrugvwsv.supabase.co/storage/v1/object/public/images/${house.value?.images}/${img.name}`)
        }
    }
}

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
let favs: number[] = []

onMounted(() => { localStorage.getItem('fav') != null ? JSON.parse(localStorage.getItem('fav')!) : [] })
if (favs.includes(house.value!.id)) {
    isFav.value = true
}

function onFav() {
    isFav.value = !isFav.value
    if (isFav.value == true) {
        favs.push(house.value!.id)
    }
    else {
        favs = favs.splice(house.value!.id, 1)
    }
    localStorage.setItem('fav', JSON.stringify(favs))
}

function goBack() {
    navigateTo('/')
}

function openFullScreen(item: string) {
    console.log(item)
}
</script>
<style>

</style>