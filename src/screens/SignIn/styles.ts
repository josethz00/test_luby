import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";


export const SignInButton = styled(RectButton)`

    width: 85%;
    background-color: #5271ff;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    height: 55px;
    elevation: 10;
    justify-content: center;

`;

export const ButtonText = styled.Text`

    color: #ccc;
    font-weight: bold;
    font-size: 18px;

`;

export const GithubLogo = styled.Image`

    margin-bottom: 40px;
    width: 140px;
    height: 140px;

`;