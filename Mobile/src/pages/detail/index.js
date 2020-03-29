import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { useNavigation ,useRoute} from '@react-navigation/native';
import {  View,Image,Text,TouchableOpacity,Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';



import Styles from './styles'
import logoImg from '../../assets/logo.png'
import styles from '../detail/styles';



export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message=`ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat(
        'pt-BR',
        { style:'currency' , 
          currency:'BRL'
        }).format(incident.value)}`;
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Heroi do caso: ${incident.title}`,
            recipients:[incident.email],
            body:message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`)
    }
    return(
        <View style ={Styles.container}>
             <View style ={Styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}> 
                <Feather  name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>

            </View>
            <View style={styles.incident}>
                    <Text style= {[Styles.incidentProperty,{margintop:0}]}>ONG:</Text>
                    <Text style= {Styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf} </Text>

                    <Text style= {Styles.incidentProperty}>Caso:</Text>
                    <Text style= {Styles.incidentValue}>{incident.title}</Text>

                    <Text style= {Styles.incidentProperty}>Valor:</Text>
                    <Text style= {Styles.incidentValue}>{Intl.NumberFormat(
                                                            'pt-BR',
                                                            { style:'currency' , 
                                                              currency:'BRL'
                                                            }).format(incident.value)}</Text>

            </View>
            <View style={Styles.contactBox}>
                <Text style={Styles.heroTitle}>Salve o dia!</Text>
                <Text style={Styles.heroTitle}>Seja o Heroi desse caso.</Text>
                <Text style={Styles.heroDescription}>Entre em contato:</Text>
                <View style={Styles.actions}>
                    <TouchableOpacity style={Styles.action} onPress={sendWhatsapp}>
                        <Text style={Styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.action} onPress={sendMail}>
                        <Text style={Styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}