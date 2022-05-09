
//TODO: cache
export async function getMenuItems() {
    let response = await fetch("http://127.0.0.1:5000/menuItems")
    return await response.json();
}