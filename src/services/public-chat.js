/*
    # Uso de servicios
    A la hora de combinar lo que es un framework de componentes como Vue y una API de backend como
    Supabase, la forma recomendada de hacerlo es separando ambos elementos.
    Es decir, evitar llamar a lo que es la API del backend directamente dentro de los componentes 
    del framework.
    En su lugar, es una mejor idea crear una capa intermedia de, por ejemplo, servicios.
    Estos servicios van a definir funciones que encapsulen la lógica de la API del backend, y va a
    ser lo que los componentes usen.

    Este modelo de trabajo tiene importantes beneficios:
    - Desacopla lo que es el framework de front (Vue) con la API del backend (Supabase).
    - Facilita la reutilización del código.
    - Facilita el mantenimiento del código.
    - Flexibiliza las funcionalidades.
    - Facilita el testing automatizado.

    Cuando terminemos, si lo hicimos bien, deberíamos ver que los componentes de Vue pasan a
    desconocer la existencia de Supabase (no les importa), de la misma forma que Supabase va a
    desconocer que se usa en los componentes de Vue (no le importa).
*/
import supabase from "./supabase";

/**
 * 
 * @param {{user_id: string, email: string, body: string}} data
 */
export async function sendNewPublicChatMessage({ user_id, email, body }) {
    /*
        Grabamos el mensaje en el backend de Supabase
        en la tabla de public_chat_messages.
    */
    const { error } = await supabase
        .from('public_chat_messages')
        .insert({
            user_id,
            email,
            body,
        });
    
    // Los errores los vamos a transformar en instancias de Error y usar el mecanismo de throw para
    // informarlos. De esta manera, vamos a poder capturarlos usando un try/catch.
    if(error) {
        console.error('[public-chat.js sendNewPublicChatMessage] Error al enviar el nuevo mensaje del chat público: ', error);

        throw new Error(error.message);
    }
}

/**
 * 
 * @returns {{id: number, email: string, body: string, created_at: string}[]}
 */
export async function fetchLastPublicChatMessages() {
    /*
        Vamos a traer los mensajes de la tabla de Supabase
        que creamos: public_chat_messages
        Para hacer consultas a las tablas de nuestra base
        de datos Postgres, usamos el método "from()" del
        cliente de Supabase.
        Este método recibe como parámetro el nombre de 
        una tabla, y prepara un query para ejecutar contra
        ella. Puede ser un INSERT, UPDATE, DELETE o SELECT.
        Si lo que queremos hacer es un SELECT, entonces
        debemos llamar al método ".select()" del ".from()".

        !! IMPORTANTE !!
        Todos estos métodos no ejecutan la consulta, sino
        que solo la preparan, y van retornando una Promise.
        Para que el query se ejecute, tenemos que agregar
        el await a la Promise.

        Finalmente, prácticamente todos los métodos de 
        Supabase que retornan una Promise, cuando se completa
        con éxito, retornan un objeto con las propiedades
        "data" y "error" (a veces algunas más, y a veces
        data no está).
        data contiene la información que la consulta retorna.
        error contiene el error ocurrido, en caso de haberlo.

        El ".select()" nos está retornando un array de 
        resultados que contiene los registros de la tabla.
    */
    const { data, error } = await supabase
        .from('public_chat_messages')
        .select();

    if(error) {
        console.error('[public-chat.js fetchLastPublicChatMessages] Error al traer los últimos mensajes del chat público: ', error);

        throw new Error(error.message);
    }

    return data;
}

/**
 * 
 * @param {(newMessage: {id: number, email: string, body: string, created_at: string}) => void} callback 
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribeToNewPublicChatMessages(callback) {
    // console.log("[public-chat.js subscribeToNewPublicChatMessage] Intentando una nueva suscripción para el canal `public_chat`.");
    

    /*
        # Recepción de mensajes en tiempo real
        Para poder usar las funcionalidades de Realtime de
        Supabase, primero que nada tenemos que crear un
        "channel" (canal).
        Los canales se identifican con un nombre, que puede
        cualquier string excepto "realtime".
        Se crean con la función ".channel" del cliente de
        Supabase.
        Noten que esta función no es asíncrona, así que no
        lleva el await.
    */
    const chatChannel = supabase.channel('public_chat');

    /*
        Con el canal en mano, podemos configurar los eventos
        que queremos escuchar.
        Para hacerlo, usamos el método ".on" del canal, que
        recibe 3 parámetros:
        1. string. La API de Realtime que queremos usar.
            Puede ser: "broadcast", "presence", "postgres_changes".
        2. object. Los datos del evento.
            En "postgres_changes" puede llevar algunas propiedades
            como:
            - "event": El nombre del evento que queremos escuchar.
                Puede ser: INSERT, UPDATE, DELETE, *
            - "schema": El schema de la base de datos donde está
                la tabla que queremos observar.
            - "table": La tabla que queremos escuchar.
        3. function. El callback a ejecutar cada vez que recibamos
            una nueva ocurrencia del evento.
            Esta función reciba automáticamente un parámetro con el
            payload del evento.
    */
    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'public_chat_messages',
        },
        payload => {
            // console.log("Nuevo mensaje recibido. Payload: ", payload);
            
            // Ejecutamos el callback que nos pasaron como argumento, mandándole los datos del 
            // nuevo mensaje.
            callback(payload.new);
        }
    );

    /*
        Finalmente, luego de que hayamos configurado los eventos que
        nos interesan observar (un channel puede tener múltiples eventos
        observados a través de múltiples llamadas a ".on"), vamos a
        "suscribirnos" al canal.
    */
    chatChannel.subscribe();
    // console.log("[public-chat.js subscribeToNewPublicChatMessage] Suscripción al canal `public_chat` abierta.");

    /*
        # Función para "desuscribirse"
        Siempre que hagamos alguna funcionalidad que se "suscribe" a algo y deja una conexión abierta,
        es imperativo que también ofrezcamos algún mecanismo para poder cancelar esa suscripción.

        La forma en que se cancela la suscripción depende de cómo haya sido la suscripción.
        Por ejemplo, los canales de Supabase tienen un método "unsubscribe()" que se puede invocar.

        Pero también tenemos que considerar *cuándo* se debe desuscribir.
        Lo más habitual es que la decisión de cuándo cancelar la suscripción quede en manos de quien
        inició (o pidió iniciar) la suscripción en un primer momento.
        En nuestro caso, quien pide suscribirse es el componente [PublicChat] al invocar a esta
        función.
        Por extensión, debería ser también [PublicChat] quien decida cuándo desuscribirse.

        Para que pueda hacerlo, necesitamos darle la manera.
        En un caso como el nuestro, donde tenemos una función que inicia la suscripción (que es esta),
        se suele hacer que se retorne una *nueva* función que al ejecutarse cancele la suscripción.

        Nota: Recuerden que solo por definir una función (incluyendo definirla en el return) *no*
        hace que se ejecute. Quien recibe la función es quien va a poder pedir ejecutarla.
    */
    return () => {
        chatChannel.unsubscribe();
        // console.log("[public-chat.js subscribeToNewPublicChatMessage] Suscripción al canal `public_chat` terminada.");
    }
}