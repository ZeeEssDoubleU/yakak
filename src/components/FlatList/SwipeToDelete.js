import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { State, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
	cond,
	add,
	set,
	eq,
	useCode,
	not,
	clockRunning,
	call,
	abs,
	debug,
	lessThan,
	multiply,
} from "react-native-reanimated";
import {
	usePanGestureHandler,
	useValue,
	snapPoint,
	timing,
	clamp,
	useClock,
	min,
} from "react-native-redash";
import styled from "styled-components/native";
// import components
import SwipeActions from "./SwipeActions";
// get dimensions
const { width } = Dimensions.get("window");

//***********
// component
//***********
// TODO: only allow one room on list to be swiped at a time

// TODO: create theme component
// TODO: add dark mode

export default function SwipeToDelete({ onRemove, item, children }) {
	const {
		gestureHandler,
		translation,
		velocity,
		state,
	} = usePanGestureHandler();

	const containerHeight = 74;
	const snapPoints = [-100, 0];
	// gesture states
	const height = useValue(containerHeight);
	const offsetX = useValue(0); // origin before gesture
	const translateX = useValue(0); // diff from origin
	const deleteOpacity = useValue(1); // multiplies by element opacity to hide
	const clock = useClock();
	const to = snapPoint(translateX, velocity.x, snapPoints);
	const shouldRemove = useValue(0);

	useCode(
		() => [
			// handle during swipe
			cond(
				eq(state, State.ACTIVE),
				set(
					translateX,
					add(
						offsetX,
						cond(
							// allow slide to left
							lessThan(translation.x, 0),
							min(translation.x, 0),
							// prevent slide past far right (past 0)
							clamp(translation.x, 0, multiply(offsetX, -1)),
						),
					),
				),
			),
			// handle end of swipe
			cond(eq(state, State.END), [
				// sets to snap points
				set(translateX, timing({ clock, from: translateX, to })),
				set(offsetX, translateX),
			]),
			// should remove actions
			cond(shouldRemove, [
				// match underlay to width of item
				set(translateX, timing({ from: translateX, to: -width })),
				// reduce height of item to 0
				set(height, timing({ from: containerHeight, to: 0 })),
				// reduce visibility of remove text
				set(deleteOpacity, timing({ from: deleteOpacity, to: -1 })),
				// calls onRemove function
				cond(not(clockRunning(clock)), call([], onRemove)),
			]),
		],
		[onRemove],
	);

	return (
		<Container style={{ height }}>
			<Underlay style={{ ...StyleSheet.absoluteFillObject }}>
				<SwipeActions
					height={containerHeight}
					x={abs(translateX)}
					{...{ deleteOpacity }}
					{...{ item }}
					{...{ shouldRemove }}
				/>
			</Underlay>
			<PanGestureHandler {...gestureHandler} activeOffsetX={[-8, 8]}>
				<Overlay style={{ transform: [{ translateX }] }}>
					{children}
				</Overlay>
			</PanGestureHandler>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(Animated.View)``;
const Overlay = styled(Animated.View)`
	background-color: ${(props) => props.theme.colors.surface};
`;
const Underlay = styled(View)`
	background-color: ${(props) => props.theme.colors.surface_bg};
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	overflow: hidden;
`;
