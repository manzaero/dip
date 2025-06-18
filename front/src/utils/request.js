export async function request(url, method = 'GET', data = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const body = method !== 'GET' && data != null ? JSON.stringify(data) : undefined;

        const res = await fetch(url, {
            method,
            credentials: 'include',
            headers,
            body,
        });

        if (!res.ok) {
            return { error: `HTTP error ${res.status}`, result: null };
        }

        const result = await res.json();
        return { error: null, result };
    } catch (e) {
        return { error: e.message || 'error', result: null };
    }
}
