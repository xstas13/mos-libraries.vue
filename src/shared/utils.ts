/**
 * Добавляем Query-параметры к URL
 */
export function urlAddParams(url: string, params: { [key: string]: any }): string {
    const objUrl = new URL(url);

    for (let k in params) {
        objUrl.searchParams.append(k, params[k]);
    }

    return objUrl.toString();
}