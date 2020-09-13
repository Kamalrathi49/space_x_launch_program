

export function getParam(location) {
    const searchParams = new URLSearchParams(location);
    return {
        launch_year: searchParams.get('launch_year') || "",
        launch_success: searchParams.get('launch_success') || "",
        land_success: searchParams.get('land_success') || ""
    }
}

export function setParam({ launch_year, launch_success, land_success }) {
    const searchParams = new URLSearchParams();
    launch_year && searchParams.set("launch_year", launch_year);
    launch_success && searchParams.set("launch_success", launch_success);
    land_success && searchParams.set("land_success", land_success);
    return searchParams.toString();
}