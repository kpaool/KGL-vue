import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/utils/axios"


export const useProcurementStore = defineStore("procurement", () => {
    const procurement = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchRecords() {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.get("/procurement")
            procurement.value = response.data

        } catch (_error) {
            console.log(_error)
            error.value = _error?.response?.data?.message ?? _error.message
        } finally {
            isLoading.value = false
        }
    }

    async function addRecord(record) {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.post("/procurement", record)
            if (response.status == 201) {
                await fetchRecords()
                return true
            } else {
                return false
            }
        } catch (_error) {
            console.log(_error?.response?.data?.error ?? _error.message)
            error.value = _error?.response?.data?.error ?? _error.message
            return false
        } finally {
            isLoading.value = false
        }
    }


    return { procurement, isLoading, error, fetchRecords, addRecord }
})