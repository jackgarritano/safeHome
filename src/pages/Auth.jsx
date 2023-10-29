import {Auth as SupabaseAuth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import SupabaseContext from '../components/SupabaseContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
	const supabase = useContext(SupabaseContext);
	const navigate = useNavigate();

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				navigate('/main');
			}
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [])

	return (
		<>
			<div className="loginModal">
				<SupabaseAuth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={['google']}
					theme="light"
				/>
			</div>
		</>
	)
}