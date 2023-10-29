import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import { insertHouseData } from '../utils/db';
import SupabaseContext from '../components/SupabaseContext';
import useAuthentication from "../hooks/useAuthentication";
import { RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function HouseData() {
	const { authenticated, userId } = useAuthentication();
	const navigate = useNavigate();
	const supabase = useContext(SupabaseContext);
	const [formData, setFormData] = useState({
		house_name: '',
		num_people: '',
		num_elderly: '',
		type_house: '',
		temp: '',
		num_floors: ''
	});

	// Handler for inputs change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	// Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		insertHouseData(supabase, formData, userId)
			.then(res => navigate(`/main`));
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>

			<form onSubmit={handleSubmit}>
				<h2>House Info</h2>
				<br></br>
				<Typography gutterBottom variant="body1">
					What is your House name?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="House Name"
					variant="outlined"
					name="house_name"
					value={formData.house_name}
					onChange={handleInputChange}
				/>
				<br></br>
				<br></br>
				<Typography gutterBottom variant="body1">
					How many people live in this house?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="House Head Count"
					type="number"
					variant="outlined"
					name="num_people"
					value={formData.num_people}
					onChange={handleInputChange}
				/>

				<br></br>
				<br></br>
				<Typography gutterBottom variant="body1">
					How many elderly people live in this house?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="House Elderly Count"
					type="number"
					variant="outlined"
					name="num_elderly"
					value={formData.num_elderly}
					onChange={handleInputChange}
				/>

				{/* New question for type of house */}
				<Typography gutterBottom variant="body1">
					What type of house do you live in?
				</Typography>
				<FormControl component="fieldset">
					<RadioGroup
						aria-label="type_house"
						name="type_house"
						value={formData.type_house}
						onChange={handleInputChange}
					>
						<FormControlLabel value="apartment/condo" control={<Radio />} label="Apartment/Condo" />
						<FormControlLabel value="house" control={<Radio />} label="House" />
					</RadioGroup>
				</FormControl>
				<br></br>
				<br></br>
				<Typography gutterBottom variant="body1">
					What extreme temperatures does the area experience? (In Fahrenheit)
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="Temperature"
					type="number"
					variant="outlined"
					name="temp"
					value={formData.temp}
					onChange={handleInputChange}
				/>
				<br></br>
				<br></br>
				<Typography gutterBottom variant="body1">
					How many floors are there in this house?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="Number of Floors"
					type="number"
					variant="outlined"
					name="num_floors"
					value={formData.num_floors}
					onChange={handleInputChange}
				/>



				<Box sx={{ marginTop: 3 }}> {/* Adjusts margin to your preference */}
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
}