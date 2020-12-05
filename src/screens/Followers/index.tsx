import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MainContainer from '../../components/MainContainer';
import PageTitle from '../../components/PageTitle';
import AuthContext from '../../hooks/useAuth';
import githubAPI from '../../services/githubAPI';
import { Follower, FollowersList, FollowerCard, FollowerImage, InfoWrapper, InfoText, InfoTextValue } from './styles';


interface GithubFollowersData {

    id: string;
    type: string;
    login: string
    avatar_url: string;

}


const Followers: React.FC = () => {

    const { user, refreshContext } = useContext(AuthContext);
    const [dataList, setDataList] = useState<Follower[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadFollowers () {

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const { data } = await githubAPI.get(`users/${user!.username}/followers?page=${page}&per_page=${6}`);
            let newArray: Follower[] = [];
            data.map((item: GithubFollowersData) => {
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
                Followers
            </PageTitle>
            <FollowersList
                showsVerticalScrollIndicator={false} 
                data={dataList} 
                keyExtractor={(data: Follower) => String(data.id)}
                onEndReached={loadFollowers}
                onEndReachedThreshold={0.2} 
                renderItem={({ item }) => (
                    <RectButton onPress={() => refreshContext(item.username)}>
                        <FollowerCard
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#1d2530", "#24292e", "#333842"]}
                            style={{ elevation: 20 }}
                        >
                            <FollowerImage source={{ uri: item.avatar_url }} resizeMode='cover' />
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
                        </FollowerCard>
                    </RectButton>
            )}/>
        </MainContainer>
    );

}

export default Followers;