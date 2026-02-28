export async function apiRequest<T>(
    path:string,
    options: RequestInit={}
): Promise<T>{

    const token = localStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`,
        {
            ...options,
            headers:{
                "Content-Type": "application/json",
                ...(token ? {Authorization: `Bearer ${token}`}: {}),
                ...options.headers,
            }
        })
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}