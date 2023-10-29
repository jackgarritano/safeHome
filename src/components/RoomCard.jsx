import { CardActionArea, CardContent, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RoomCard({ roomName, safetyScore, roomId }){
	const navigate = useNavigate();
	function navigateToHouse() {
		navigate(`/room?id=${roomId}`);
	}

	let scoreColor = 'red'; // Default to red for low scores
	if (safetyScore >= 7) {
		scoreColor = 'green';
	} else if (safetyScore >= 4) {
		scoreColor = '#D1A00C';
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={navigateToHouse}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{roomName}
					</Typography>
					<Typography variant="body2" sx={{ color: scoreColor }}>
						Room safety score: {safetyScore}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};