import { useEffect, useState } from 'react'
import { api } from '../../services/api'

import {Link} from 'react-router-dom'

import orcamentoSvg from '../../assets/home/orcamento.svg'
import editSvg from '../../assets/home/edit.svg'
import deleteSvg from '../../assets/home/delete.svg'

import './style.scss'

interface UserClientProps {
  id: string;
  nameFantasyContact: string;
  cnpj: string;
  companySize: string;
  quantityEmployees: number;
  telephoneCommercial: number;
}

function Home() {
  const [clients, setClients] = useState<UserClientProps[]>([])

  useEffect(() => {
    api.get('/users')
      .then(response => setClients(response.data))
  }, [])

  function handleDelete(id: string) {
    api.delete(`/users/${id}`)
    const deleteClient = clients.filter(client => client.id !== id)
    setClients(deleteClient)
  }

  return (
    <div className="container">
      <div className="content">
          <header>
            <h2>Criação de Orçamento</h2>
            <Link to="/tools">
              <button className="btnFerramentas">Ferramentas</button>
            </Link>
          </header>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>CNPJ</th>
                <th>Porte</th>
                <th>QDT de Funcionários</th>
                <th>Telefone (Com)</th>
                <th></th>
                
              </tr>
              <tr>
                <td><input className="firstInput" type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <td><input type="text" placeholder="Filtrar"/></td>
                <th><Link to="/create"><button className="btnCreate">+</button></Link></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.nameFantasyContact}</td>
                  <td>{client.cnpj}</td>
                  <td>{client.companySize}</td>
                  <td>{client.quantityEmployees}</td>
                  <td>{client.telephoneCommercial}</td>
                  <td>
                    <div>
                      <Link to={`/budget/${client.id}`}>
                        <button>
                          <img src={orcamentoSvg} alt="imagem de orçamento" />
                        </button>
                      </Link> 
                      <Link to={`/edit/${client.id}`}>
                        <button>
                          <img src={editSvg} alt="imagem de editar" />
                        </button>
                      </Link>
                      <button onClick={() => {handleDelete(client.id)}}>
                        <img src={deleteSvg} alt="imagem de deletar" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export { Home }