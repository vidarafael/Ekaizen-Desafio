import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../services/api"
import './style.scss'

interface UseParamsProps {
  id: string;
}

interface UserEditProps {
  name: string;
  priceSmallSize: number;
  priceMidSize: number;
  priceLargeSize: number;
}

function EditTool() {
  const [toolsEdit, setToolsEdit] = useState({} as UserEditProps)

  const { id } = useParams<UseParamsProps>()

  useEffect(() => {
    api.get(`/tools/${id}`).then(response => setToolsEdit(response.data))
  }, [])

  return (
    <div className="container">
      <div className="content">
        <header>    
          <h2>Edição da Ferramenta</h2>
        </header>
        <hr />

        <form 
          className="formCreateClient" 
          action={`http://localhost:3001/tools/edit/${id}`} 
          method="POST"
        >
          <div>
            <div>
              <label htmlFor="name">Produto</label>
              <input type="text" name="name" id="name" 
                value={toolsEdit.name} 
                onChange={(e) => {setToolsEdit({
                  ...toolsEdit,
                  name: e.target.value
                })}}
                />  
            </div>
 
            <div>
              <label htmlFor="priceSmallSize">Preço Base - Pequeno Porte</label>
              <input type="number" name="priceSmallSize" id="priceSmallSize" 
                value={toolsEdit.priceSmallSize}
                onChange={(e) => {setToolsEdit({
                  ...toolsEdit,
                  priceSmallSize: Number(e.target.value)
                })}}
              />
            </div>

            <div>
              <label htmlFor="priceMidSize">Preço Base - Médio Porte</label>
              <input type="number" name="priceMidSize" id="priceMidSize" 
                value={toolsEdit.priceMidSize}
                onChange={(e) => {setToolsEdit({
                  ...toolsEdit,
                  priceMidSize: Number(e.target.value)
                })}}
              />
            </div>
            
          </div>

          <div>
            <div>
              <label htmlFor="priceLargeSize">Preço Base - Grande Porte</label>
              <input type="text" name="priceLargeSize" id="priceLargeSize" 
                value={toolsEdit.priceLargeSize}
                onChange={(e) => {setToolsEdit({
                  ...toolsEdit,
                  priceLargeSize: Number(e.target.value)
                })}}
              />
            </div>

          </div>


          <div className="divBtn">
            <button type="submit">Próximo</button>
          </div>
        </form>
      </div>


    </div>
  )
}

export {EditTool}