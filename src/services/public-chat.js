import supabase from "./supabase";

/**
 * 
 * @param {{user_id: string, email: string, body: string}} data
 */
export async function sendNewPublicChatMessage({ user_id, email, body }) {
    // Grabamos el mensaje en el backend de Supabase en la tabla de public_chat_messages
    const { error } = await supabase
        .from('public_chat_messages')
        .insert({
            user_id,
            email,
            body,
        });
    
    // Los errores los vamos a transformar en instancias de Error y usar el mecanismo de throw para
    // informarlos. De esta manera, vamos a poder capturarlos usando un try/catch
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
    
    const chatChannel = supabase.channel('public_chat');
    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'public_chat_messages',
        },
        payload => {
            // console.log("Nuevo mensaje recibido. Payload: ", payload);
            
            // Ejecutamos el callback que nos pasaron como argumento, mandándole los datos del nuevo mensaje.
            callback(payload.new);
        }
    );

    chatChannel.subscribe();
    // console.log("[public-chat.js subscribeToNewPublicChatMessage] Suscripción al canal `public_chat` abierta.");

    return () => {
        chatChannel.unsubscribe();
        // console.log("[public-chat.js subscribeToNewPublicChatMessage] Suscripción al canal `public_chat` terminada.");
    }
}