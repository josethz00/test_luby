import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";


export const SignOutButton = styled(RectButton)`

    width: 200px;
    background-color: #5271ff;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    margin-top: 25px;
    height: 55px;
    elevation: 10;
    justify-content: center;

`;

export const ProfileImage = styled.Image`

    background-color: #333;
    width: 200px;
    height: 200px;
    border-radius: 25px;
    align-self: center;
    border-width: 3px;
    border-color: #aaa;
    margin-bottom: 20px;

`;

export const ButtonText = styled.Text`

    color: #ccc;
    font-weight: bold;
    font-size: 18px;

`;

export const Username = styled.Text`

    font-weight: bold;
    text-align: center;
    margin-top: 15px;
    font-size: 20px;
    color: #aaa;

`;