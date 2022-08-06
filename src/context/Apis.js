const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export async function getFooter() {
    let response = await fetch(`${API_ENDPOINT}/details/`, {
        method: "GET",
    })
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}

export async function getSubCategory() {
    let response = await fetch(`${API_ENDPOINT}/sub_category/`, {
        method: "GET",
    })
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}

export async function getProductData_WithFilter({search_with:search_with, query:query}) {
    let response = await fetch(`${API_ENDPOINT}/product/?${search_with}=${query}`, {
        method: "GET",
    })
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}