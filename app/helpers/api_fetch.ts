/* eslint-disable @typescript-eslint/no-explicit-any */
export async function apiFetch(
    route: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    body?: any,
    routeType: "NATIVE" | "EXTERNAL" = "NATIVE",
    cache:
        | "no-store"
        | "force-cache"
        | "no-cache"
        | "default"
        | "only-if-cached"
        | "reload" = "no-store"
) {
    try {
        let res;
        if (routeType === "EXTERNAL") {
            res = await fetch(`${route}`, {
                method,
                cache,
                body,
            });
        } else {
            res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
                method,
                cache,
                headers: body
                    ? { "Content-Type": "application/json" }
                    : undefined,
                body: body ? JSON.stringify(body) : undefined,
            });
        }
        return res;
    } catch (err) {
        console.log(err);
    }
}
