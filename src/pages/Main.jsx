import useAuthentication from "../hooks/useAuthentication";
import HouseCard from "../components/HouseCard";
import { Container, Grid } from '@mui/material';

export default function Main() {
	const { authenticated } = useAuthentication();
	const houses = [];
	for (let i = 0; i < 10; ++i) {
		houses.push({
			name: i % 3 == 0 ? "Jack's House" : i,
			rooms: 3,
		})
	}

	const containerStyles = {
		minHeight: '100%', // covers the full height of its parent, you can also use '100vh' for full viewport height
		display: 'flex',
		alignItems: 'center', // centers children vertically in this container
		justifyContent: 'center', // centers children horizontally in this container
	  };

	return <>
		<Container style={containerStyles}>
			<Grid container spacing={3}>
				{houses.map((house, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<HouseCard
							houseName={house.name}
							numberOfRooms={house.rooms}
							houseId={'abc123'}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	</>
}