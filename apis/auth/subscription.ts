import axios from 'provider/http';

export default async function fetchAllPlans() {
    return await axios.get(`/auth/all-plans`)
}

export async function selectFreePlan(isElder=0) {
    console.log(isElder)
    return await axios.post(`/user/select-free-plan`, {is_elder: isElder})
}