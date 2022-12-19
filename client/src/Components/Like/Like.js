import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import firebase from "firebase";
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import useUser from '../../hooks/useUser';

const Like = ({ id }) => {
	// const { user, isLoading } = useUser();
	// const userId = user.uid;
	const { user, isLoading } = useUser();

	//	const increment = 1;
	//	const decrement = -1;
	//	const [likes, setLikes] = useState([]);
	const [liked, setLiked] = useState(undefined);

	useEffect(async () => {
		let likeData = await getLikeData();
		let lArray = likeData.likes;
		if (lArray.includes(user.uid)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, []);

	const changeLike = (likeStatus, LikeData) => {
		const docRef = doc(db, 'Posts', id);
		let likeArray = LikeData;
		console.log(likeArray);
		if (likeStatus) {
			if (likeArray.includes(user.uid)) {
				console.log('Inside Unlike');
				const index = likeArray.indexOf(user.uid);
				likeArray.splice(index, 1);
				console.log(likeArray);
				console.log('Unlike Success');
			}
		} else {
			if (!likeArray.includes(user.uid)) {
				console.log('Inside Like');
				likeArray.push(user.uid);
				console.log(likeArray);
				console.log('like Success');
			}
		}
		const data = {
			likes: likeArray,
		};
		updateDoc(docRef, data)
			.then((docRef) => {
				console.log('Value of an Existing Document Field has been updated');
				//console.log(commentPull.comments);
				setLiked(!liked);
			})
			.catch((error) => {
				console.log(error);
			});

		// logic to come
	};

	const getLikeData = async () => {
		const docRef = doc(db, 'Posts', id);
		const docSnap = await getDoc(docRef);
		let data;
		if (docSnap.exists()) {
			data = docSnap.data();
		}
		return data;
	};

	const handleLikeClick = async () => {
		let likeData = await getLikeData();
		console.log(likeData);
		changeLike(liked, likeData.likes);
	};

	return (
		<div data-testid="likeButton">
			{liked ? (
				<FavoriteIcon
					onClick={() => handleLikeClick()}
					color="secondary"
					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
			) : (
				<FavoriteBorder
					onClick={() => handleLikeClick()}
					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
			)}
		</div>
	);
};

export default Like;
