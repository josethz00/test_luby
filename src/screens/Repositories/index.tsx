import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MainContainer from '../../components/MainContainer';
import PageTitle from '../../components/PageTitle';
import AuthContext from '../../hooks/useAuth';
import githubAPI from '../../services/githubAPI';
import { RepositoriesList, Repo, RepositoryCard, RepoImage,  InfoWrapper, InfoText, InfoTextValue } from './styles';


interface GithubReposData {
    id: string;
    html_url: string;
    language: string;
    name: string;
    owner: {
        avatar_url: string;
    };
    default_branch: string;
}


const Repositories: React.FC = () => {

    const { user } = useContext(AuthContext);
    const [dataList, setDataList] = useState<Repo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    async function loadRepos () {

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const { data } = await githubAPI.get(`users/${user!.username}/repos?page=${page}&per_page=${6}`);
            let newArray: Repo[] = [];

            data.map((item: GithubReposData) => {
                newArray.push({
                    id: item.id,
                    html_url: item.html_url,
                    language: item.language,
                    name: item.name,
                    avatar_url: item.owner.avatar_url,
                    branch: item.default_branch
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

        loadRepos();

    }, []);
  
    return (
        <MainContainer>
            <PageTitle>
                Your repositories
            </PageTitle>
            <RepositoriesList
                showsVerticalScrollIndicator={false} 
                data={dataList} 
                keyExtractor={(data: Repo) => String(data.id)}
                onEndReached={loadRepos}
                onEndReachedThreshold={0.2} 
                renderItem={({ item }) => (
                    <RectButton onPress={() => navigation.navigate('RepositoryDetails', item)}>
                        <RepositoryCard
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#1d2530", "#24292e", "#333842"]}
                            style={{ elevation: 20 }}
                        >
                            <RepoImage source={{ uri: item.avatar_url }} resizeMode='cover' />
                            <View>                       
                                <InfoWrapper>
                                    <InfoText>
                                        Repo:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.name}
                                    </InfoTextValue>
                                </InfoWrapper>
                                <InfoWrapper>
                                    <InfoText>
                                        Language:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.language}
                                    </InfoTextValue>
                                </InfoWrapper>
                                <InfoWrapper style={{ marginBottom: 0 }}>
                                    <InfoText>
                                        Branch:
                                    </InfoText>
                                    <InfoTextValue>
                                        {item.branch}
                                    </InfoTextValue>
                                </InfoWrapper>
                            </View>
                        </RepositoryCard>
                    </RectButton>
            )}/>
        </MainContainer>
    );

}

export default Repositories;