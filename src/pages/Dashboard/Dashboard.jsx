import Menu from '../../components/Menu/Menu';
import CardQuantidade from '../../components/CardQuantidade/CardQuantidade';

import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './Dashboard.css'

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Dashboard() {

  const [locaisCadastrados, setLocaisCadastrados] = useState([]);
  const [quantidadePorEstado, setQuantidadePorEstado] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/dashboard')
    .then(res => {
        if (!res.ok) throw new Error("Locais não encontrados ou erro na API.");
        return res.json();
    })
    .then(pontosDeColeta => {
      setLocaisCadastrados(pontosDeColeta.locais);
      setQuantidadePorEstado(pontosDeColeta.estados);
    })
    .catch(err => {
      console.error("Erro ao buscar locais:", err.message);
    });
  }, [])

  return (
    <div className='pagina-dashboard'>
      <Menu></Menu>
      <h2 className='subtitulo-mapa'>Distribuições de pontos de coletas</h2>
      <MapContainer className='mapa' center={[-15.8, -47.9]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locaisCadastrados.map((local, index) => (
        <Marker key={index} position={[local.latitude, local.longitude]}>
          <Popup>
            <strong>{local.estado} - {local.nome}</strong> <br />{local.descricao}
          </Popup>
        </Marker>
        ))}
      </MapContainer>

      <h2 className='subtitulo-mapa'>Distribuições de pontos de coletas por estado</h2>
      <ul className='cards-dashboard'>
        {quantidadePorEstado.map((estado) => (
          <CardQuantidade estado={estado.nome} quantidade={estado.quantidade}></CardQuantidade>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard;
