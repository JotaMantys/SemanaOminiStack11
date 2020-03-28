import React ,{useState,useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom';
import { FiPower , FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

import './style.css';
import logImg from '../../assets/logo.svg';


export default function Profile(){
    const history = useHistory();
    const [incidents , setIncidents] = useState([]);
    const ong_id = localStorage.getItem('ong_id');
    const ong_name = localStorage.getItem('ong_name')

     useEffect(()=>{
        api.get('profile',{
            headers:{
                authorization:ong_id
            }
        }).then( response =>{
            setIncidents(response.data)
        })
     },[ong_id]);

     async function handleDeleteIncident(id){
        
            try {
                
                await api.delete(`incidents/${id}`,{
                    headers:{
                        authorization:ong_id
                    }
                });

                setIncidents(incidents.filter(incident => incident.id !== id))
            } catch (err) {
                alert('erro ao excluir caso, tente novamente')
            }
     }

     function handleLogout(){
        localStorage.clear();
        history.push('/')
     }
    return(
        <div className="profile-container">
            <header>
                <img src={logImg} alt="Be The Hero"/>
                <span>Ben vindo {ong_name}</span>
                <Link className="button" to="/incidents/new"  >cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
               {incidents.map(incidents =>(
                <li key={incidents.id}>
                    <strong>Caso:</strong>
                    <p>{incidents.title}</p>

                    <strong>Descricao:</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR',{ style : 'currency' , currency:'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>

               ))}
                
            </ul>
        </div>
    );
}