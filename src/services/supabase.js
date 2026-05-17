// Es servicio va a crear el cliente de Supabase, y exportarlo para
// que lo puedan usar otro servicios del proyecto.
import { createClient } from '@supabase/supabase-js';

// Para poder crear el cliente necesitamos la URL y la clave publicable
// (publishable key) de nuestro proyecto.
// Ambos datos los podemos obtener en el dashboard del proyecto.
const SUPABASE_URL = "https://gtnbkmobdwnqnblpeegr.supabase.co";
const SUPABASE_KEY = "sb_publishable_0oGHI_KNvAa_TRoYit30pg_H3GKE2hw";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;