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
    /*
        # Autenticación con Supabase
        Para la interacción con la autenticación, debemos acceder a la propiedad "auth" de Supsbase.
        Entre los métodos que auth ofrece, tenemos signUp() que permite crear una nueva cuenta.

        Para que se ejecute el registro, necesitamos usar el await igual que antes.
        Y nos retorna un objeto con las propiedades data y error, igual que antes.
    */
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

/*
    # Patrón de diseño Observer
    Los patrones de diseño son, como su nombre indica, estrategias comunes para resolver ciertos problemas
    en el diseño del software.
    Específicamente, vamos a enfocarnos en el patrón Observer, que es uno de los más populares.

    El patrón Observer busca resolver el escenario donde tenemos a muchos interesados en ser notificados
    de los cambios ocurridos en algún elemento del sistema.
    Es decir, es común tener algún elemento en nuestro sistema (llamémoslo el "subject") que puede cambiar
    o tener sucesos asociados a él, de los cuales el impacto de ellos puede ser de interés para muchos
    otros elementos del sistema (llamémoslos "observers").

    La idea, entonces, es que estos "observers" se puedan "suscribir" al "subject" para que se les
    "notifique" cada vez que un cambio determinado ocurre.

    Por ejemplo, el estado de autenticación del usuario en el sistema es un excelente candidato para
    el patrón Observer.

    Para poder implementar este patrón, necesitamos cumplir con lo siguiente:
    - Tener el "subject". En nuestro caso, vamos a crear una variable "userData" que tenga los datos
        del usuario autenticado.
    - Tener una lista de los "observers" suscritos. Esto lo podemos resolver con una variable que sea
        un array, a la que vamos a llamar "observers".
    - Función que permita "suscribirse" para recibir los cambios en el subject. En nuestro caso, los
        "observers" que van a poder suscribirse van a ser callbacks. Al cual le vamos a pasar los datos
        del usuario autenticado al invocarse.
    - Función que permita "notificar" a un observer de los datos actuales del subject.
    - Función que permita notificar a todos los observers.
    - Detectar los cambios en el subject, y pedir que se notifique a los observers.

    Nota: Además de hablar de "suscripción" para referirnos al proceso de registrar un observer, también
    se habla de "escuchar" (listen), "adjuntar" (attach), "observar" (watch) y "cuando" (on).
*/
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
    // Invocamos al callback del observer, y le pasamos una *copia* de los datos del usuario autenticado.
    observer({...userData});
}

function notifyAll() {
    observers.forEach(observer => notify(observer));
    // observers.forEach(notify); // También podría escribirse así.
}