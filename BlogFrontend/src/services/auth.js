

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

export async function signUpUser(email, username, password) {
    console.log('Signing up with:', { email, username, password });
    const response = await fetch('http://localhost:1231/api/auth/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password })
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Sign up failed');
    }

    return data;
}

