import type {Database} from "../types";

import {createClient} from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  process.env.NEXT_PUBLIC_SUPABASE_ROLE!,
);

export default supabase;
