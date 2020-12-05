import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export interface IFollowing {

    id: string;
    type: string;
    username: string
    avatar_url: string;

}

export const FollowingList = styled(FlatList as new () => FlatList<IFollowing>)`

    padding-bottom: 100px;

`;

export const FollowingCard = styled(LinearGradient)`

    width: 90%;
    height: 140px;
    margin-top: 20px; 
    align-self: center; 
    border-radius: 20px;
    flex-direction: row;
    align-items: center;

`; 

export const Title = styled.Text`

    font-weight: bold;
    margin: 60px 0px 20px 0px;
    font-size: 20px;
    text-align: center;
    color: #aaa;

`;

export const FollowingImage = styled.Image`

    background-color: #333;
    border-radius: 80px;
    width: 80px;
    height: 80px;
    margin: 0px 15px;

`;

export const InfoWrapper = styled.Text`

    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;

`;

export const InfoText = styled.Text`
 
    font-size: 16px;
    color: #aaa;
    font-weight: bold;

`;

export const InfoTextValue = styled.Text`

    font-size: 16px;
    color: #808080;

`;