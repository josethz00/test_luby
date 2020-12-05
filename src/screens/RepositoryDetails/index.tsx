import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


type StackParamsList = {
    A: undefined;
    B: {
      html_url: string;
      name: string;
    };
}


const RepositoryDetails: React.FC = () => {

    const route = useRoute<RouteProp<StackParamsList, 'B'>>();
    const { html_url } = route.params;

    return (
        <WebView style={{ marginTop: 35 }} source={{ uri: html_url }} />
    );

}

export default RepositoryDetails;