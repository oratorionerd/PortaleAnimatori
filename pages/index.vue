<template>
    <v-container class="py-2 px-2 fill-height">
        <v-row class="h-100">
            <v-col cols="12" class="h-100">

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title v-slot="{ open }">
                            <v-row no-gutters>
                                <v-col cols="12" class="text--secondary">
                                    <v-fade-transition leave-absolute>
                                        <span v-if="open">Quali esigenze ha il tuo gruppo?</span>
                                        <v-row v-else no-gutters style="width: 100%">
                                            <v-col cols="4" class="d-flex justify-start">
                                                Filtri
                                            </v-col>
                                            <v-col cols="4" class="d-flex justify-start">
                                                Posti: {{ filters.people || 'Non selezionato' }}
                                            </v-col>
                                            <v-col cols="4" class="d-flex justify-start">
                                                Budget: {{ filters.budget || 'Non selezionato' }}
                                            </v-col>
                                        </v-row>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row justify="space-around" no-gutters>
                                <v-col cols="12" class="my-1">
                                    Numero posti
                                    <v-slider v-model="filters.people" thumb-label :max="100" :min="10"
                                        :step="1"></v-slider>
                                </v-col>
                                <v-col cols="12" class="my-1">
                                    Costo a persona
                                    <v-slider v-model="filters.budget" thumb-label :max="20" :min="5"
                                        :step="1"></v-slider>
                                </v-col>
                                <v-col cols="12">
                                    <v-combobox v-model="filters.regions" :items="regions" label="Regioni" multiple
                                        chips></v-combobox>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-card>
                    <v-list lines="two">
                        <template v-for="house in houses" :key="house.id">
                            <v-list-item link @click="showHouse(house.id)">
                                <v-list-item-title>{{ house.name }}</v-list-item-title>

                                <v-list-item-subtitle>
                                    Costo{{ house.price_per_person ? ' per persona: ' : ': ' }} {{ house.price }} <br/>
                                    Posti: {{ house.size }}
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-divider></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
const client = useSupabaseClient()

const regions = ['Trentino', 'Emilia', 'Veneto', 'Lombardia']

const filters = ref({
    budget: 20,
    people: 10,
    regions: []
})

const loading = ref(null)
const { data: houses } = await client.from('houses').select('id, name, price, price_per_person, size, region').eq('visible', true).order('created_at')
for(let i=0;i<10;i++) {
    houses?.push(houses[0])
}
function showHouse(id: number) {
    navigateTo(`/houses/${id}`)
}
</script>
<style scoped>

</style>