import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://divdyjribbfhphsxgksa.supabase.co'
const supabaseKey = 'sb_publishable_QAmwrsaMxTqPIr0CHoVmvw_7EtrYBGIEY'

export const supabase = createClient(supabaseUrl, supabaseKey)