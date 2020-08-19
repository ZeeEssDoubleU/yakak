import React from "react";
import { StyleSheet, Text } from "react-native";
import styled from "styled-components";
import Animated, {
	divide,
	interpolate,
	Extrapolate,
	sub,
	cond,
	add,
	lessThan,
	multiply,
} from "react-native-reanimated";

//***********
// component
//***********

export default function SwipeActions({ height, x, deleteOpacity }) {
	// if x < height, return x
	// if height >= x, return x + (x - height)
	const size = cond(lessThan(x, height), x, add(x, sub(x, height)));
	// if x < height, return x
	// if height >= x, return (x - height) / 2
	const translateX = cond(lessThan(x, height), 0, divide(sub(x, height), 2));
	const borderRadius = divide(size, 2);
	const scale = interpolate(size, {
		inputRange: [20, 30],
		outputRange: [0.01, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const iconOpacity = interpolate(size, {
		inputRange: [height - 10, height + 10],
		outputRange: [1, 0],
	});
	const textOpacity = sub(1, iconOpacity);

	return (
		<Container
			style={{
				height: size,
				width: size,
				borderRadius,
				transform: [{ translateX }],
			}}
		>
			<MinusIcon style={{ opacity: iconOpacity }} />
			<TextContainer
				style={{
					...StyleSheet.absoluteFillObject,
					opacity: multiply(textOpacity, deleteOpacity),
					transform: [{ scale }],
				}}
			>
				<RemoveText>Remove</RemoveText>
			</TextContainer>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(Animated.View)`
	justify-content: center;
	align-items: center;
	background-color: #d93f12;
`;
const MinusIcon = styled(Animated.View)`
	height: 5px;
	width: 20px;
	background-color: white;
`;
const TextContainer = styled(Animated.View)`
	justify-content: center;
	align-items: center;
`;
const RemoveText = styled(Text)`
	color: white;
	font-size: 14px;
`;
