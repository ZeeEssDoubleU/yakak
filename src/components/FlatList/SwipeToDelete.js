import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
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
// import components
import SwipeActions from "./SwipeActions";

//***********
// component
//***********

export default function SwipeToDelete({ onSwipe, children }) {
	// TODO: find way to assign container height dynamically.  Maybe useLayout on container component
	const containerHeight = 74;
	const {
		gestureHandler,
		translation,
		velocity,
		state,
	} = usePanGestureHandler();
	const { width } = Dimensions.get("window");
	const height = useValue(containerHeight);
	const snapPoints = [-100, 0];
	const offsetX = useValue(0); // origin before gesture
	const translateX = useValue(0); // diff from origin
	const deleteOpacity = useValue(1);
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
							// prevent slide past far right (0)
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
				cond(not(clockRunning(clock)), call([], onSwipe)),
			]),
		],
		[onSwipe],
	);
	return (
		<Container style={{ height }}>
			<TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
				<Underlay style={{ ...StyleSheet.absoluteFillObject }}>
					<SwipeActions
						height={containerHeight}
						x={abs(translateX)}
						{...{ deleteOpacity }}
					/>
				</Underlay>
			</TouchableWithoutFeedback>
			<PanGestureHandler {...gestureHandler}>
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
	background-color: white;
`;
const Underlay = styled(View)`
	background-color: #e1e2e3;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	overflow: hidden;
`;
