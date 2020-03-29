import React,{useState,useEffect} from 'react';
import { useNavigation} from '@react-navigation/native';
import { View,FlatList  ,Image,Text,TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons'

import Styles from './styles'
import logoImg from '../../assets/logo.png'

import api from '../../services/api'

export default function Incidents() {
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage]= useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    };

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && Incidents.length === total){
            return;
        }

        setLoading(true);
        const response = await api.get('incidents',{
            params:{ page}
        });

        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    
    useEffect(()=>{
        loadIncidents();
     },[])

    return(
        <View style={Styles.container}>
            <View style ={Styles.header}>
                <Image source={logoImg} />
                <Text style = {Styles.headerText}>Total de <Text style = {Styles.headerTextBold}> {total} casos </Text></Text>                        
            </View>    

            <Text style = {Styles.title}>Bem-vindo!</Text>
            <Text style = {Styles.description}>Escolha um dos casos a baixo e salve o dia.</Text>

            <FlatList style= {Styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator = {false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item:incident})=>(
                    <View style= {Styles.incident}>
                    <Text style= {Styles.incidentProperty}>ONG:</Text>
                    <Text style= {Styles.incidentValue}>{incident.name}</Text>

                    <Text style= {Styles.incidentProperty}>Caso:</Text>
                    <Text style= {Styles.incidentValue}>{incident.title}</Text>

                    <Text style= {Styles.incidentProperty}>Valor:</Text>
                    <Text style= {Styles.incidentValue}>{Intl.NumberFormat(
                                                            'pt-BR',
                                                            { style:'currency' , 
                                                              currency:'BRL'
                                                            }).format(incident.value)}</Text>

                    <TouchableOpacity style={Styles.detailsButton} onPress={()=>navigateToDetail(incident)}>
                            <Text style={Styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather  name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                    
                </View>
                )}
            />

        </View>
    );
}