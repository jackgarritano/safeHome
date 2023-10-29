import { CardActionArea, CardContent, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RoomCard({ roomName, safetyScore, roomId, houseId }){
	const navigate = useNavigate();
	function navigateToHouse() {
		navigate(`/room?id=${roomId}&house_id=${houseId}`);
	}

	let scoreColor = 'red'; // Default to red for low scores
	if (safetyScore <= 12 && safetyScore > 6) {
		scoreColor = '#D1A00C';
	} else if (safetyScore <= 6) {
		scoreColor = 'green';
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={navigateToHouse}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{roomName}
					</Typography>
					<Typography variant="body2" sx={{ color: scoreColor }}>
						Number of recommendations: {safetyScore}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};