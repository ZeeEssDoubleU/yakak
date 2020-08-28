import React, {
	useEffect,
	useCallback,
	useState,
	useRef,
	useLayoutEffect,
} from "react";
import { Dimensions, View } from "react-native";
import {
	TextInput,
	HelperText,
	Button,
	IconButton,
	useTheme,
} from "react-native-paper";
import styled from "styled-components/native";
import Animated, {
	useCode,
	cond,
	set,
	eq,
	neq,
	and,
	greaterThan,
	debug,
} from "react-native-reanimated";
import { useValue, timing } from "react-native-redash";
// get dimensions
const { width, height } = Dimensions.get("window");

//***********
// component
//***********

export default function FormInput({
	labelName,
	error = false,
	secureTextEntry = false,
	...props
}) {
	const { colors } = useTheme();
	// shows showText icon if secureTextEntry prop is present
	const [showText, setShowText] = useState(!secureTextEntry);

	const showError = useValue(false);
	const errorHeight = useValue();

	// animation params
	const height = useValue(0);
	const paddingBottom = useValue(0);

	const displayErrors = (error) => {
		switch (error.code) {
			case "auth/invalid-email":
				return "Email is empty or incorrectly formatted.";
			case "auth/user-not-found":
				return "User not found.  Please try again";
			case "auth/wrong-password":
				return "Incorrect password.  Please try again.";
			case "auth/too-many-requests":
				return "Too many unsuccessful login attempts. Please try again later.";
			case "auth/weak-password":
				return "Password should be at least 6 characters.";
			default:
				return;
		}
	};

	useCode(
		() => [
			cond(
				showError,
				// if showError true
				[
					set(height, timing({ to: errorHeight })),
					set(paddingBottom, timing({ to: 8 })),
				],
				// if showError false
				[
					set(height, timing({ to: 0 })),
					set(paddingBottom, timing({ to: 0 })),
				],
			),
		],
		[showError, errorHeight],
	);

	return (
		<Container>
			<Wrapper>
				{secureTextEntry && (
					<ShowText
						icon={showText ? "eye-off-outline" : "eye-outline"}
						color={colors.disabled}
						onPress={() => setShowText(!showText)}
						size={22}
					/>
				)}
				<Input label={labelName} secureTextEntry={!showText} {...props} />
			</Wrapper>
			<ErrorContainer
				style={{
					height,
					paddingBottom,
				}}
			>
				<ErrorMessage
					type="error"
					onLayout={(event) => {
						const { height } = event.nativeEvent.layout;

						// set animation trigger and to value
						errorHeight.setValue(height);
						showError.setValue(error ? true : false);
					}}
				>
					{displayErrors(error)}
				</ErrorMessage>
			</ErrorContainer>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(View)`
	align-items: center;
`;
const ErrorContainer = styled(Animated.View)`
	width: ${width / 1.5}px;
	overflow: hidden;
`;
const ErrorMessage = styled(HelperText)`
	position: absolute;
	left: 0;
	top: 0;
	width: ${width / 1.5}px;
	padding: 0;
	color: ${(props) => props.theme.colors.danger};
`;
const Input = styled(TextInput)`
	margin: 10px 0;
	width: ${width / 1.5}px;
	height: ${height / 15}px;
`;
const ShowText = styled(IconButton)`
	position: absolute;
	right: 0;
	z-index: 10;
`;
const Wrapper = styled(View)`
	justify-content: center;
`;
