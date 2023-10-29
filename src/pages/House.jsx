import useAuthentication from "../hooks/useAuthentication";
import { Container, Grid, Button } from '@mui/material';
import RoomCard from "../components/RoomCard";
import useQueryParam from '../utils/useQueryParam';
import { useNavigate } from 'react-router-dom';

export default function House() {
	const { authenticated } = useAuthentication();
	const houseId = useQueryParam('id');
	const navigate = useNavigate();

	const containerStyles = {
		minHeight: '100%', // covers the full height of its parent, you can also use '100vh' for full viewport height
		display: 'flex',
		alignItems: 'center', // centers children vertically in this container
		justifyContent: 'center', // centers children horizontally in this container
		flexDirection: 'column'
	};

	const rooms = [];
	for (let i = 0; i < 10; ++i) {
		rooms.push({
			name: i % 3 == 0 ? "Jack's Room" : i,
			rooms: 3,
			safetyScore: 5
		})
	}



	return <>
		<Container style={containerStyles}>
			<h2>Your Rooms</h2>
			<br></br>
			<Button variant="contained" color="primary" onClick={() => navigate(`/roomredirect?id=${houseId}`)}>
				Add Room
			</Button>
			<br></br>
			<Grid container spacing={3}>
				{rooms.map((room, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<RoomCard
							roomName={room.name}
							safetyScore={room.safetyScore}
							roomId={room.id}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	</>
}

