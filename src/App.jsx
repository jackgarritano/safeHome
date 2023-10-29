import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import SupabaseContext from './components/SupabaseContext'
import './App.css'

function App() {
	const supabase = useContext(SupabaseContext);

	return (
		<>
			<div className="loginModal">
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={['google']}
					theme="light"
				/>
			</div>

		</>
	)
}

export default App
