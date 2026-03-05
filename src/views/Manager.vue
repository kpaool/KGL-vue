<script setup>

    import { onMounted } from 'vue';  
    import { useProcurementStore } from '@/stores/procurementStore';  
    import AddProcurement from '@/components/ui/AddProcurement.vue';

    const procurementStore = useProcurementStore()

    onMounted(() => {
        procurementStore.fetchRecords()
    })


</script>

<template>


    <div v-if="procurementStore.isLoading" class="absolute z-100 h-screen w-screen" style="background-color: rgba(255, 255, 255, 0.9);">
        <div class="flex items-center justify-center h-screen w-screen">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>
    </div>
  
 

    <main class="flex-1 overflow-y-auto">
        <header class="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
            <div>
                <h1 class="text-xl font-bold text-slate-800">Stock & Procurement</h1>
                <p class="text-sm text-slate-500">Maganjo & Matugga Farm Intake</p>
            </div>
            <AddProcurement/>
        </header>

        <div class="p-8">


            <div class="flex gap-8">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 class="font-bold text-slate-800">Recent Procurement Log</h3>
                        <button class="text-emerald-600 text-sm font-semibold hover:underline">View Ledger</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th class="px-6 py-4 font-semibold">Produce (Type)</th>
                                    <th class="px-6 py-4 font-semibold">Dealer</th>
                                    <th class="px-6 py-4 font-semibold">Tonnage</th>
                                    <th class="px-6 py-4 font-semibold">Cost (UGX)</th>
                                    <th class="px-6 py-4 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-sm text-slate-600">
                                <tr v-for="record in procurementStore.procurement" :key="record._id" class="hover:bg-slate-50">
                                    <td class="px-6 py-4"><span class="font-semibold text-slate-900">{{ record.produceName }}</span> <br> <span class="text-xs">{{record.type}}</span></td>
                                    <td class="px-6 py-4">{{record.dealerName}}</td>
                                    <td class="px-6 py-4 font-medium">{{record.tonnage}}</td>
                                    <td class="px-6 py-4">{{record.cost.toLocaleString({style:"currency",currency:"UGX"})}}</td>
                                    <td class="px-6 py-4">{{new Date(record.date).toLocaleDateString("en-GB")}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </main>


</template>

<style>
#procurementModal:target {
    display: block; /* Ensures visibility when the ID is in the URL */
}

/* Optional: Smooth fade effect using Tailwind's transition classes applied above */
.target\:visible:target {
    visibility: visible;
    opacity: 1;
}
</style>