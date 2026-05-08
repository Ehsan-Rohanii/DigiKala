const FetchData=async(url,options={})=>{
    try {
        const res=await fetch(import.meta.env.VITE_BASE_URL+url,options)
        const data=await res.json()
        return data
    } catch (error) {
        return {success:false}
    }
}
export default FetchData