import { useState, createContext, ReactNode } from "react";

interface ToolProviderProps {
  children: ReactNode;
}

interface ToolsCheckedProps {
  id: string;
  name: string;
  value: number;
  checked?: boolean;
}

interface ContextDataProps {
  toolsChecked: ToolsCheckedProps[];
  setStateTool: (tool: ToolsCheckedProps[]) => void;
  typeSell: string;
  setStateTypeSell: (type: string) => void;
  quantityUsers: number;
  setStateQuantityUsers: (quantity: number) => void;
  taxes: number;
  setStateTaxes: (taxes: number) => void;
  commissionValue: number;
  setStateCommissionValue: (comission: number) => void;
}

export const ToolContext = createContext<ContextDataProps>({} as ContextDataProps);

export function ToolProvider({children}: ToolProviderProps) {
  const [toolsChecked, setToolsChecked] = useState<ToolsCheckedProps[]>([])
  const [typeSell, setTypeSell] = useState('')
  const [quantityUsers, setQuantityUsers] = useState(0)
  const [taxes, setTaxes] = useState(0)
  const [commissionValue, setCommissionValue] = useState(0)


  function setStateTool(tool: ToolsCheckedProps[]) {
    setToolsChecked(tool)
  }

  function setStateTypeSell(type: string) {
    setTypeSell(type)
  }

  function setStateQuantityUsers(quantity: number) {
    setQuantityUsers(quantity)
  }

  function setStateTaxes(taxes: number) {
    setTaxes(taxes)
  }

  function setStateCommissionValue(comission: number) {
    setCommissionValue(comission)
  }

  return (
    <ToolContext.Provider value={
      {
        toolsChecked, setStateTool,
        typeSell, setStateTypeSell,
        quantityUsers, setStateQuantityUsers,
        taxes, setStateTaxes,
        commissionValue, setStateCommissionValue
      }}>
      {children}
    </ToolContext.Provider>
  )
}