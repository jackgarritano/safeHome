import { CardActionArea, CardContent, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HouseCard = ({ houseName, safetyScore, houseId }) => {
	const navigate = useNavigate();
	function navigateToHouse(){
		navigate(`/house?id=${houseId}`);
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={navigateToHouse}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{houseName}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						House safety score: {safetyScore}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default HouseCard;