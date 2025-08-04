

export async function loginUser(email, password) {

    console.log('Logging in with:', { email, password });
    const response = await fetch('http://localhost:1231/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });


    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
}

