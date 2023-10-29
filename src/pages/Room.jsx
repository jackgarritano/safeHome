import useAuthentication from "../hooks/useAuthentication";
import HouseCard from "../components/HouseCard";
import { Container, Grid, Button } from '@mui/material';
import { getAllHouses, getUserData } from "../utils/db";
import { useState, useEffect, useContext } from "react";
import SupabaseContext from '../components/SupabaseContext';
import {
	generateBathroomRecs,
	generateBedroomRecs,
	generateHouseRecs,
	generateKitchenRecs,
	generateLivingRoomRecs,
	generateStairsRecs
} from '../utils/recommendations.js';
import { useNavigate } from 'react-router-dom';


