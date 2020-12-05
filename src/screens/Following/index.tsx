import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MainContainer from '../../components/MainContainer';
import PageTitle from '../../components/PageTitle';
import AuthContext from '../../hooks/useAuth';
import githubAPI from '../../services/githubAPI';
import { IFollowing, FollowingList, FollowingCard, FollowingImage, InfoWrapper, InfoText, InfoTextValue } from './styles';


interface GithubFollowingData {

    id: string;
    type: string;
    login: string
    avatar_url: string;

}


const Following: React.FC = () => {

    const { user, refreshContext } = useContext(AuthContext);
    const [dataList, setDataList] = useState<IFollowing[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadFollowers () {

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const { data } = await githubAPI.get(`users/${user!.username}/following?page=${page}&per_page=${6}`);
            let newArray: IFollowing[] = [];
            data.map((item: GithubFollowingData) => {
                newArray.push({
                    id: item.id,
                    type: item.type,
                    username: item.login,
                    avatar_url: item.avatar_url
                })
            });

            setDataList([...dataList, ...newArray])
            setPage(page+1);
            setLoading(false);
            return;
        }
        catch (err) {
            alert('Network error');
        }
    }

    useEffect(() => {

        loadFollowers();

    }, []);

    return (
        <MainContainer>
            <PageTitle>
                Following
            </PageTitle>
            <FollowingList
                showsVerticalScrollIndicator={false} 
                data={dataList} 
                keyExtractor={(data: IFollowing) => String(data.id)}
                onEndReached={loadFollowers}
                onEndReachedThreshold={0.2} 
                renderItem={({ item }) => (
                    <RectButton onPress={() => refreshContext(item.username)}>
                        <FollowingCard
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#1d2530", "#24292e", "#333842"]}
                            style={{ elevation: 20 }}
                        >
                            <FollowingImage source={{ uri: item.avatar_url }} resizeMode='cover' />
                            <View>                       
                                <InfoWrapper>
                                    <InfoText>
                                        Username:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.username}
                                    </InfoTextValue>
                                </InfoWrapper>
                                <InfoWrapper>
                                    <InfoText>
                                        Type:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.type}
                                    </InfoTextValue>
                                </InfoWrapper>
                                <InfoWrapper style={{ marginBottom: 0 }}>
                                    <InfoText>
                                        ID:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.id}
                                    </InfoTextValue>
                                </InfoWrapper>
                            </View>
                        </FollowingCard>
                    </RectButton>
            )}/>
        </MainContainer>
    );

}

export default Following;