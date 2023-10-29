import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';
import useAuthentication from "../hooks/useAuthentication";
import { RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useQueryParam from '../utils/useQueryParam';




export default function RoomRedict() {
	const {authenticated, userId} = useAuthentication();
	const navigate = useNavigate();
	const houseId = useQueryParam('id');
	const [formData, setFormData] = useState({
		type_room: '',
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
		console.log('type_room', formData.type_room);
		switch(formData.type_room){
			case "Bedroom":
				navigate(`/bedroomdata?house_id=${houseId}`);
				break;
			case "Kitchen":
				navigate(`/kitchendata?house_id=${houseId}`);
				break;
			case "Living Room":
				navigate(`/livingroomdata?house_id=${houseId}`);
				break;
			case "Bathroom":
				navigate(`/bathroomdata?house_id=${houseId}`);
				break;
			case "Stairs":
				navigate(`/stairsdata?house_id=${houseId}`);
				break;
			default:
				navigate(`/house?house_id=${houseId}`);
		}
	};


	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>
			
			<form onSubmit={handleSubmit}>
				<h2>Room Redirect</h2>
				<br></br>
                {/* New question for type of house */}
                <Typography gutterBottom variant="body1">
                Which type of room would you like to enter?
                </Typography>
                <FormControl component="fieldset">
                <RadioGroup
                    aria-label="type_room"
                    name="type_room"
                    value={formData.type_room}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="Bedroom" control={<Radio />} label="Bedroom" />
                    <FormControlLabel value="Kitchen" control={<Radio />} label="Kitchen" />
                    <FormControlLabel value="Living Room" control={<Radio />} label="Living Room" />
                    <FormControlLabel value="Bathroom" control={<Radio />} label="Bathroom" />
                    <FormControlLabel value="Stairs" control={<Radio />} label="Stairs" />
                </RadioGroup>
                </FormControl>
				

				<Box sx={{ marginTop: 3 }}> {/* Adjusts margin to your preference */}
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
}