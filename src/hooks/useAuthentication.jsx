import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SupabaseContext from '../components/SupabaseContext';

export default function useAuthentication() {
	const supabase = useContext(SupabaseContext);
	const [authenticated, setAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Check the current session on initial load
		async function checkCurrentSession(){
			const {data: { session }, error} = await supabase.auth.getSession();
			if (session) {
				setAuthenticated(true);
				return session.user.id;
			} else {
				// If not authenticated, redirect to the login page
				navigate('/auth');
			}
		}
		checkCurrentSession().then(res => setUserId(res));
		
		// Set up a subscription to auth changes
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setAuthenticated(true);
			} else if (event === 'SIGNED_OUT') {
				setAuthenticated(false);
				navigate('/auth');
			}
		});
		// Cleanup function
		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return { authenticated, userId };
}
