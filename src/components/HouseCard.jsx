import { CardActionArea, CardContent, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HouseCard({ houseName, safetyScore, houseId }){
	const navigate = useNavigate();
	function navigateToHouse(){
		navigate(`/house?id=${houseId}`);
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
						{houseName}
					</Typography>
					<Typography variant="body2" sx={{ color: scoreColor }}>
						House safety score: {safetyScore}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};