import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParam(param){
	const query = new URLSearchParams(useLocation().search);
	return query.get(param);
}