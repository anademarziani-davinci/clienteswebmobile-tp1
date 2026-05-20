import supabase from "./supabase";

// El "subject" con los datos del usuario autenticado.
let userData = {
    id: null,
    email: null,
}
// El array de "observers" para la autenticación.
let observers = [];

// Nos suscribimos para escuchar los cambios del estado de autenticado en Supabase.
supabase.auth.onAuthStateChange((event, session) => {
    // Obtenemos los datos del usuario autenticado.
    if(session) {
        userData = {
            id: session.user.id,
            email: session.user.email,
        }
    } else {
        userData = {
            id: null,
            email: null,
        }
    }
    // Notificamos a los observers.
    notifyAll();
});

/**
 * 
 * @param {{email: string, password: string}} data
 * @returns {User}
 */
export async function register({ email, password }) {
    const { data, error } = await supabase
        .auth
        .signUp({
            email, 
            password,
        });

    if(error) {
        console.error('[auth.js register] Error al crear la nueva cuenta: ', error);
        
        throw new Error(error.message);
    }

    return data.user;
}

/**
 * 
 * @param {{email: string, password: string}} data
 * @returns {User}
 */
export async function login({ email, password }) {
    const { data, error } = await supabase
        .auth
        .signInWithPassword({
            email,
            password,
        });

    if(error) {
        console.error('[auth.js login] Error al iniciar sesión en la cuenta: ', error);
        
        throw new Error(error.message);
    }

    return data.user;
}

export async function logout() {
    const { error } = await supabase
        .auth
        .signOut();
    
    if(error) {
        console.error('[auth.js logout] Error al cerrar sesión en la cuenta: ', error);
        
        throw new Error(error.message);
    }
}
/**
 * 
 * @param {() => void} observer 
 */
export function subscribeToUserStateChanges(observer) {
    observers.push(observer);

    // Apenas se suscribe, le pasamos ya los datos actuales.
    notify(observer);
}

function notify(observer) {
    observer({...userData});
}

function notifyAll() {
    observers.forEach(observer => notify(observer));
}

/**
 * Actualiza la contraseña del usuario autenticado.
 * Requiere que haya una sesion activa.
 * 
 * @param {string} newPassword
 * @returns {Object}
 */
export async function updatePassword(newPassword) {
    const { data, error } = await supabase
        .auth
        .updateUser({
            password: newPassword,
        });

    if (error) {
        console.error('[auth.js updatePassword] Error al actualizar la contraseña: ', error);

        throw new Error(error.message);
    }

    return data.user;
}