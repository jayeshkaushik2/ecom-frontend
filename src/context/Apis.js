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

export async function getHomepageData() {
    let response = await fetch(`${API_ENDPOINT}/homepage/`)
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}


export async function getCartRef({token:token}) {
    let response = await fetch(`${API_ENDPOINT}/create_cart/`, {
        method: "GET",
        headers:  {"Authorization" : token}
    })
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}

export async function getCartRefData({token:token, ref:ref}) {
    let response = await fetch(`${API_ENDPOINT}/update_cart/${ref}/`)
    let data = await response.json()
    if (response.ok) {
        return data
    }
    else {
        throw response;
    }
}