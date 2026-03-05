<script setup>
    import {reactive,ref} from "vue"
    import { useProcurementStore } from "@/stores/procurementStore";
    import { toast } from 'vue3-toastify';
    import { useRouter } from "vue-router";
    const procurementStore = useProcurementStore()

    const router = useRouter()

    const newRecord = reactive({
        produceName:"",
        type:"",
        date:"",
        time:"",
        tonnage:0,
        cost:0,
        dealerName:"",
        branch:"",
        contact:"",
        sellingPrice:0,
    })

    async function submitForm(){
        const hasSubmmited = await procurementStore.addRecord(newRecord)
        if(hasSubmmited){
            toast.success("New record added")
            router.push("/manager")
        }else{
            toast.error("Failed to add new record")
        }

    }


</script>


<template>
    <div class="flex items-center gap-4">
        <a href="#procurementModal" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md">
            + New Procurement
        </a>

        <div id="procurementModal" class="fixed inset-0 z-50 invisible target:visible opacity-0 target:opacity-100 transition-all duration-300">
            
            <a href="#" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-default"></a>

            <div class="relative min-h-screen flex items-center justify-center p-4 pointer-events-none">
                <div class="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 pointer-events-auto">
                    
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">Record Procurement</h2>
                            <p class="text-sm text-slate-500">Ensure all fields meet KGL validation standards.</p>
                        </div>
                        <a href="#" class="text-slate-400 hover:text-slate-600 p-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </a>
                    </div>

                    <form @submit.prevent="submitForm" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        
                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Produce Name</label>
                            <input type="text" v-model="newRecord.produceName" name="produceName" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g., Soybeans">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Type of Produce</label>
                            <input type="text" v-model="newRecord.type" name="type" pattern="[a-zA-Z\s]{2,}" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g., Kawanda">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                            <input type="date" v-model="newRecord.date" name="date" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Time of Produce</label>
                            <input type="time" v-model="newRecord.time" name="time" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Tonnage (Kgs)</label>
                            <input type="number" v-model="newRecord.tonnage" name="tonnage" min="1000" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Min 1000kg">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Cost (UgX)</label>
                            <input type="number" v-model="newRecord.cost" name="cost" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Min 10,000">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Dealer Name</label>
                            <input type="text" v-model="newRecord.dealerName" name="dealerName" minlength="2" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Individual or Company">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Branch Name</label>
                            <select name="branch" v-model="newRecord.branch" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                                <option value="Maganjo">Maganjo</option>
                                <option value="Matugga">Matugga</option>
                            </select>
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Contact</label>
                            <input type="tel" v-model="newRecord.contact" name="contact" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g., 0770000000">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Selling Price (UgX/kg)</label>
                            <input type="number" v-model="newRecord.sellingPrice" name="sellingPrice" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div v-if="procurementStore.error" class="text-center" style="color:red">
                            {{ procurementStore.error }}
                        </div>

                        <div class="col-span-full flex gap-3 mt-6">
                            <button type="submit" :disabled="procurementStore.isLoading" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-[0.98]">
                                {{ procurementStore.isLoading ? "Adding record...": "Record Procurement"  }}
                            </button>
                            <a href="#" class="px-8 py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl text-center hover:bg-slate-200 transition-all">
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>